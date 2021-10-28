function mulberry32(a) {
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

class CirclesPainter {
    static get inputProperties() {
        return [
            '--colors',
            '--min-radius',
            '--max-radius',
            '--min-opacity',
            '--max-opacity',
            '--num-circles',
            '--seed',
        ];
    }

    constructor() {
        this.getRandom = mulberry32(0);
    }

    parseProps(props) {
        return [
            '--colors',
            '--min-radius',
            '--max-radius',
            '--min-opacity',
            '--max-opacity',
            '--num-circles',
            '--seed',
        ].map((prop) => {
            if (!props.get(prop).length) {
                return undefined;
            }

            if (prop === '--colors') {
                return props
                    .get(prop)
                    .toString()
                    .split(',')
                    .map((color) => color.trim());
            } else {
                return parseInt(props.get(prop).toString());
            }
        });
    }

    paint(ctx, geom, props) {
        const { width: w, height: h } = geom;
        const [
            colors = ['#71a7ee', '#7940c1'],
            minRadius = 10,
            maxRadius = 50,
            minOpacity = 10,
            maxOpacity = 80,
            numCircles = 5,
            seed = 0,
        ] = this.parseProps(props);
        this.getRandom = mulberry32(seed);
        for (let i = 0, max = numCircles; i < max; i++) {
            this.drawCircle(ctx, {
                x: this.rand(0, w),
                y: this.rand(0, h),
                r: this.rand(minRadius, maxRadius),
                color: colors[this.rand(0, colors.length - 1)],
                alpha: this.rand(minOpacity, maxOpacity),
            });
        }
    }

    drawCircle(ctx, circle) {
        ctx.globalAlpha = circle.alpha / 100;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);

        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    }

    rand(min, max) {
        return Math.floor(this.getRandom() * (max - min + 1)) + min;
    }
}

registerPaint('circles', CirclesPainter);
