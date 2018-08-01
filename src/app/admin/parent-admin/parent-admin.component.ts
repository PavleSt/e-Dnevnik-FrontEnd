import { Component, OnInit } from '@angular/core';
import { ParentEntity } from '../../models/ParentEntity';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-parent-admin',
  templateUrl: './parent-admin.component.html',
  styleUrls: ['./parent-admin.component.css']
})
export class ParentAdminComponent implements OnInit {
  allparentslist: ParentEntity[];
  addingParent: boolean;
  model: any = {};

  constructor(private parentService: ParentService) { }

  ngOnInit() {
    this.addingParent = false;
    this.getParents();
  }

  addParentEntity() {
    const newParent = new ParentEntity();
    newParent.first_name = this.model.firstName;
    newParent.last_name = this.model.lastName;
    newParent.date_of_birth = this.model.dob;
    newParent.email = this.model.email;
    newParent.username = this.model.username;
    newParent.password = this.model.password;
    newParent.confirm_password = this.model.confirmPassword;
    this.parentService
    .addParent(newParent)
    .subscribe(res => this.allparentslist.push(newParent));
  }

  getParents(): void {
    this.parentService.getParents().subscribe(
      parents1 => this.allparentslist = parents1
    );
  }
}
