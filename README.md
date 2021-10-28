# CSS Houdini Circles

A CSS Houdini Paint Worklet to draw background circles.

![CSS Houdini Circles](https://github.com/bramus/css-houdini-circles/blob/main/assets/css-houdini-circles.png?raw=true)

## Usage

### 1. Getting `css-houdini-circles`

#### Using a pre-built hosted version

The easiest way to get `css-houdini-circles` is to use the prebuilt version through UNPKG. Just skip ahead to step 2 in that case.

#### Installing it Locally

You can install the `css-houdini-circles` locally using NPM.

```bash
npm install css-houdini-circles
```

Alternatively you can clone [the `css-houdini-circles` repo](https://github.com/bramus/css-houdini-circles/) and after manually build the project:

```bash
cd css-houdini-circles
npm install
npm run build
```

You'll find the built file in the `./dist` folder.

### 2. Loading `css-houdini-circles`

To include it you must loads the module in the given JavaScript file and add it to the Paint Worklet.

If you want to use the UNPKG hosted version of `css-houdini-circles`, use `https://unpkg.com/css-houdini-circles/dist/circles.js` as the `moduleURL`.

```js
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    "https://unpkg.com/css-houdini-circles/dist/circles.js"
  );
}
```

If you've installed `css-houdini-circles` using NPM or have manually built it, refer to its url:

```js
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("url/to/circles.js");
}
```

#### A note on older browsers

To add support for [browsers that don't speak Houdini](https://ishoudinireadyyet.com/), you can include the [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) before loading the Worklet.

```html
<script>
  (async function () {
    if (CSS["paintWorklet"] === undefined) {
      await import("https://unpkg.com/css-paint-polyfill");
    }

    CSS.paintWorklet.addModule(
      "https://unpkg.com/css-houdini-circles/dist/circles.js"
    );
  })();
</script>
```

### 3. Applying `css-houdini-circles`

To use Circles Paint Worklet you need to set the `background-image` property to `paint(circles)`

```css
.element {
  background-image: paint(circles);
}
```

## Configuration

You can tweak the appearance of the Cicles Paint Worklet by setting some CSS Custom Properties

_💡 The Worklet provides default values so defining them is not required_

```css
.element {
  --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b,
    #4d908e, #577590, #277da1;
  --min-radius: 20;
  --max-radius: 100;
  --num-circles: 30;
  --min-opacity: 10;
  --max-opacity: 50;
  --seed: 42;
  background-image: paint(circles);
}
```

| property      | description                                                            | default value      |
| ------------- | ---------------------------------------------------------------------- | ------------------ |
| --colors      | **Colors To Use**, one or more hexadecimal colors comma separated      | `#71a7ee, #7940c1` |
| --min-radius  | **Minimum Radius**, minimum circle radius (in pixels)                  | `10`               |
| --max-radius  | **Maximum Radius**, maximum circle radius (in pixels)                  | `50`               |
| --min-opacity | **Minimum Opacity**, minimum circle opacity (as a percentage: 0 – 100) | `10`               |
| --max-opacity | **Maximum Opacity**, maximum circle opacity (as a percentage: 0 – 100) | `80`               |
| --num-circles | **Number of Circles to draw**                                          | `5`                |
| --seed        | **Seed for the random placement**                                      | `0`                |

## Demo

You can play with a small demo on CodePen over at [https://codepen.io/bramus/pen/PoGbbzL](https://codepen.io/bramus/pen/PoGbbzL)

If you've cloned the repo you can run `npm run demo` to launch the included demo.

## Acknowledgements

The structure of this project was borrowed from [The lines PaintWorklet](https://github.com/CSSHoudini/css-houdini/tree/main/src/lines) by [@nucliweb](https://github.com/nucliweb). More inspiration was fetched from [extra.css](https://github.com/una/extra.css/tree/master/lib) by [@una](https://github.com/una/)

## License

`css-houdini-circles` is released under the MIT public license. See the enclosed `LICENSE` for details.
