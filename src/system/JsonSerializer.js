import camelcaseKeys from 'camelcase-keys';

export const Serializable = opts => (target, prop, descriptor) => {
  target.serializer = object => {
    const instance = new target();

    instance.object = object;
    instance.renderAttribute = data => {
      if (!data) return null;

      const result = {};

      for (var i = 0, len =  target.attributes.length; i < len; i++) {
        const attr = target.attributes[i];

        if (typeof attr === 'object') {
          const key = Object.keys(attr)[0];
          const attrName = attr[key].as || key;

          if (attr[key].serializer) {
            const ObjectSerializer = attr[key].serializer;
            result[key] = ObjectSerializer.serializer(data[key]);
          } else {
            if (attr[key].virtual) {
              result[attrName] = instance[attr[key].virtual];
            } else {
              result[attrName] = data[key];
            }
          }
        } else {
          result[attr] = data[attr];
        }
      }

      return camelcaseKeys(result);
    }

    instance.serialize = (data) => {
      if (data instanceof Array) {
        const result = [];

        for (var i = 0, len = data.length; i < len; i++) {
          const entry = data[i];
          result.push(instance.renderAttribute(entry));
        }

        return result
      } else {
        return instance.renderAttribute(data);
      }
    }

    return instance.serialize(object);
  }
}

export const Attribute = opts => (target, prop, descriptor) => {
  target.constructor.attributes = target.constructor.attributes || [];
  target.constructor.attributes.push(opts ? {[prop]: opts} : prop)
}
