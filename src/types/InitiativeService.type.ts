//Data types used by InitiativeService

import { ICurrentUserRelation, IInitiativeData, IProgress, IStatistics } from "./initiative.type";

export interface IInitiative extends IInitiativeData {
    progress: IProgress;
    current_user_relation: ICurrentUserRelation;
}
export interface GetInitiativeRequest {
    order_by?: string; //popularity | create_time[default] | update_time | location
    order_by_direction?: string; //asc | desc[default]
    cause?: string[];
    start_after?: string; //id of the initiative to load after. 
                          //Normally the id should be the last loaded initiative
                          //If not specified, will load from the beginning
    limit?: number; //max number of initiatives to load, default 50
    keyword?: string; //search keywords separated by space. 
                      // initiative name and description should include all keywords
    types?: string; //initiative type, virtual or in_person
    is_liked? : boolean; //if the current user has liked the initiative
}

export interface GetInitiativeResponse {
    initiatives: IInitiative[];
}
