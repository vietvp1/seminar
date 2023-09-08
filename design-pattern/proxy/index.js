const validFontSizes = {
  gigantic: "gigantic",
  large: "large",
  medium: "medium",
  small: "small",
  tiny: " tiny",
};

const legacyFontSizes = {
  extraLarge: "gigantic", // deprecated
  extraSmall: "tiny", // deprecated
};

const fontSizes = {
  ...legacyFontSizes,
  ...validFontSizes,
};

const proxiedFontSizes = new Proxy(fontSizes, {
  get: (target, propName) => {
    if (propName in legacyFontSizes) {
      console.warn(
        `${propName} is deprecated. Please use ${target[propName]} instead.`
      );
    }
    return Reflect.get(target, propName);
  },
  set: (target, propName, value) => {
    throw Error("Không được đổi");
  },
});

proxiedFontSizes.extraLarge;
proxiedFontSizes.extraLarge = "12";
