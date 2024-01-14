export class CanframeItem {
	id!: string;
	year!: string;
	model!: string;
}

export interface CanframeList {
	canframes:CanframeItem[];
	pagination?: {
		token:string,
		limit:number
	};
}

export interface CanframeListArgs {
	year:string;
	sort?:SortDirection;
	token?:string;
	limit?:number;
}

export enum SortDirection {
	asc = 'asc',
	desc = 'desc'
}