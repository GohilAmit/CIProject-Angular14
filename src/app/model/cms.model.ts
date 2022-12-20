export class CMS{
  id:number=0;
  title:string='';
  description:string='';
  slug:string='';
  status:string='';
}


export class Mission{
  id:number=0;
  missionTitle:string='';
  missionDescription:string='';
  missionOrganisationName:string='';
  missionOrganisationDetail:string='';
  countryId:number=0;
  countryName:string='';
  cityId:number=0;
  cityName:string='';
  startDate:any;
  endDate:any;
  totalSheets:number=0;
  registrationDeadLine:any;
  missionTheme:string='';
  missionSkill:string='';
  missionImages:string='';
  missionDocuments:any;
  missionAvilability:string='';

}


export class Country {
  id:number=0;
  countryName:string='';
}

export class City {
  id:number=0;
  countryId:number=0;
  cityName:string='';
}
