/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/assets/styles/index.css";
import "./src/assets/styles/Global.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "lazysizes";

import mediumZoom from "medium-zoom";

// Add z-index to images when zoomed,
// need to do this as it's not available as an option in the medium zoom plugin
export const onClientEntry = () => {
  // const { zIndex } = { ...defaultOptions, ...pluginOptions };
  const zIndex = 20;

  // Inject styles.
  const styles = `
    .medium-zoom {
      z-index: ${zIndex};
    }
  `;

  const node = document.createElement(`style`);
  node.id = `medium-zoom-styles`;
  node.innerHTML = styles;
  document.head.appendChild(node);
};

// Below fn runs when the user goes to a new route, also runs before the initial render
export const onRouteUpdate = () => {
  mediumZoom(".medium-zoom", {
    background: "var(--bg)",
  });
};
