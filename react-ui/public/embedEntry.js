const loadElamyskalenteriEmbed = () => {
  const baseUrl = 'https://elamyskalenteri.turku.fi/';
  const getEntrypoints = async () => {
    const data = await fetch(`${baseUrl}asset-manifest.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return data.entrypoints.map((entrypoint) => `${baseUrl}${entrypoint}`);
  };

  const createElement = (tagName, attributes) => {
    const el = document.createElement(tagName);
    attributes.forEach((attribute) => {
      el.setAttribute(attribute[0], attribute[1]);
    });
    return el;
  };

  const createScript = (src, attrs) => {
    return createElement('script', [['src', src], ...attrs]);
  };

  const createStyle = (src, attrs) => {
    return createElement('link', [['rel', 'stylesheet'], ['href', src], ...attrs]);
  };

  getEntrypoints().then((entrypoints) =>
    entrypoints.forEach((entrypoint) => {
      if (entrypoint.endsWith('.css')) {
        const el = createStyle(entrypoint, []);
        document.head.appendChild(el);
      } else if (entrypoint.endsWith('.js')) {
        const el = createScript(entrypoint, []);
        document.head.appendChild(el);
      }
    }),
  );
};

loadElamyskalenteriEmbed();
