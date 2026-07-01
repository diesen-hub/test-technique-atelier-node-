export interface PlayerData {
  rank: number;
  points: number;
  weight: number;
  height: number;
  age: number;
  last: number[];
}

export interface PlayerCountry {
  picture: string;
  code: string;
}

export interface PlayerProps {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: string;
  country: PlayerCountry;
  picture: string;
  data: PlayerData;
}

export class Player {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly shortname: string;
  readonly sex: string;
  readonly country: PlayerCountry;
  readonly picture: string;
  readonly data: PlayerData;

  constructor(props: PlayerProps) {
    this.id = props.id;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.shortname = props.shortname;
    this.sex = props.sex;
    this.country = props.country;
    this.picture = props.picture;
    this.data = props.data;
  }
}
