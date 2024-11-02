
// @name('EntityBase')
export abstract class EntityBase {
	public id = '';
}

// @name('Server')
export class Server extends EntityBase {
	public label = '';
	public active = false;
	public iconName = '';
	public validation = true;
}


