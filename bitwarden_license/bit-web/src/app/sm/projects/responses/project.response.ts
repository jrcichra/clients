import { BaseResponse } from "@bitwarden/common/models/response/baseResponse";

export class ProjectResponse extends BaseResponse {
  id: string;
  organizationId: string;
  name: string;
  creationDate: string;
  revisionDate: string;
  //deletedDate: string;

  constructor(response: any) {
    super(response);
    this.id = this.getResponseProperty("Id");
    this.organizationId = this.getResponseProperty("OrganizationId");
    this.name = this.getResponseProperty("Key");
    this.creationDate = this.getResponseProperty("CreationDate");
    this.revisionDate = this.getResponseProperty("RevisionDate");
    //this.deletedDate = this.getResponseProperty("DeletedDate");
  }
}
