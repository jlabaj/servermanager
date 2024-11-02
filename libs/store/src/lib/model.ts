import { name } from '@serverManager/tools';

@name('EntityBase')
export abstract class EntityBase {
	public key?: string;
}

@name('Server')
export class Server extends EntityBase {
	public label = '';
	public id = '';
	public active = false;
	public iconName = '';
}


