//Type of data that will be stored in Firebase
export interface ICause {
  cause_id: string, //id of cause. need to translate to i18n text before display
}
export interface IUser {
  uid: string, //id of user
  authProvider: string, //auth provider, google or facebook
  name: string, //name of user
  email: string, //email of user
  photoURL?: string, //avatar of user
}
export interface IContact {
  id: string,
  name?: string,
  email: string,
  phone?: string,
  address?: string,
  city?: string,
  state?: string,
  zip?: string,
  country?: string,
  notes?: string,
}
export interface IImage {
  id: string,
  url: string,
}

export enum InitiativeType {
  virtual = 'virtual',
  in_person = 'in_person',
}

export enum ApplicationStatus {
  pending = 'pending',
  approved = 'approved',
  invited = 'invited', //when an applicant was invited by admin
  rejected = 'rejected',
}

export interface IApplicationStatusHistory {
  status: ApplicationStatus,
  time: Date,
  updated_by: string, //user who updated this status
}

export interface IStatistics {
  likes: number;
  participants: number; //how many people have joined the initiative
  applicants: number; //how many applied to support the initiative
  comment_counts: number;
  views: number;
  shared_counts: number;
}
//Stored in /initiatives
export interface IInitiativeData {
  id?: string | null,
  name: string,
  admins: string[], //user id of all admins of the initiative
  created_by: string, //user id of creator
  causes?: ICause[],
  create_time: Date,
  update_time?: Date,
  date_range: string,
  image?: string,
  type: InitiativeType,
  Location?: string,
  description: string,
  published?: boolean,
  featured?: boolean,
  //free style strings about the initiative, such as 'must be 18+', 'need to fill up application', etc.
  things_to_know? : string[], 
  statistics? : IStatistics
}

// Model initiatives liked by users
// See https://fireship.io/lessons/advanced-firestore-nosql-data-structure-examples/
// Stored in /initiative_user_likes
export interface IInitiativeLikedByUser {
  initiative_id: string,
  user_id: string,
  created_time: Date
}

// Model initiatives and users that applied to support them
// Not all applications are approved.
// Stored in /initiative_user_applications
export interface IInitiativeApplications {
  initiative_id: string, //index
  user_id: string, //index
  status: ApplicationStatus, // the latest status
  application_time: Date, // when the application was requested by the user
  status_history: IApplicationStatusHistory[], // History of all statuses 
}
export interface IProgress {
  total: number,
  completed: number,
}

export interface InitiativeDetails {
  initiative: IInitiativeData,
  description: string,
  what_will_you: string,
  volunteer_types: IVolunteerType[]
  contacts: IContact[],
  related_initiatives: string[], // of initiative ids
  initiator: string, //id of the user who created the initiative

  //For user that logged in, the following fields will be populated
  participants: IParticipant[]  //users who participated in the initiative. 
}

export interface IVolunteerType {
  type_id: string,
}

export enum AuthType {
  twitter = 'twitter',
  facebook = 'facebook',
  google = 'google',
  github = 'github',
  linkedin = 'linkedin',
}
export interface IParticipant {
  auth_type: AuthType,
  user_id: string, //normally email address
  profile_name: string,
  profile_image: string,
  birthday: Date, //optional birthday to ensure participants is over 18 or not
}

export interface ICurrentUserRelation {
  is_liked_by_me: boolean, // if the current user liked the initiative
  my_roles:string[] //if the current user is participating the initiative, what are the roles
}