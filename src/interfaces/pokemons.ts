export interface IPokemon {
    id: number;
    name: string;
    moves: MoveElement[];
    weight: number;
}

export interface MoveElement {
    move: MoveLearnMethodClass;
    version_group_details: VersionGroupDetail[];
}

export interface MoveLearnMethodClass {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethodClass;
    version_group: MoveLearnMethodClass;
}
