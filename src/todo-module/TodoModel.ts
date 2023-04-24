export enum TodoStatusEnum {
	actif = 'En Cours',
	waiting = 'En Attente',
	done = 'Finalisé',
}

export class TodoModel {
	id: string;
	name: string;
	description: string;
	date_de_creation: Date;
	status: TodoStatusEnum;
	constructor({
		id,
		name,
		description,
		status = TodoStatusEnum.waiting,
	}: {
		id: string;
		name?: string;
		description?: string;
		status?: TodoStatusEnum;
	}) {
		this.id = id;
		this.date_de_creation = new Date();
		this.name = name;
		this.description = description;
		this.status = status;
	}
}
