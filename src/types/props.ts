type Possibly = Promise<void> | undefined;

export interface IColorFunctionProps {
	deletable?: boolean;
}

export interface IColorCubeProps extends IColorFunctionProps {
	deleteSet?: () => void;
	addColor: (color: string) => Possibly;
	onDelete: (color: string) => Possibly;
	color: string;
}

export interface IColorProps {
	colors: string[];
}

export interface IUserColorProps {
	userColors: string[];
}

export interface IColorSelectorProps extends IUserColorProps {
	updateUserColors: (userColors: string[]) => void;
}

export interface IColorListProps extends IColorProps, IColorFunctionProps {
	deleteSet?: () => void;
	addColor?: (color: string) => Promise<void>;
	onDelete?: (color: string) => Promise<void>;
}

export interface IButtonProps {
	className?: string;
	onClick: () => void;
	label: string;
}

export interface ICartProps {
	userColors: string[];
	updateUserColors: (colors: string[]) => void;
}
