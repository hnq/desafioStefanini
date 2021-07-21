import { Serializable, Attribute } from '@system/JsonSerializer';

@Serializable()
export default class StandardSerializer {

  @Attribute() standard;
  //@Attribute({ as: 'attWithAlias' }) standard;
  @Attribute({ virtual: 'fullMessage' }) message;
  @Attribute() result;

  get fullMessage() {
    return `Status ${this.object.standard.toUpperCase()}!`;
  }

}
