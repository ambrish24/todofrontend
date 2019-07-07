
import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  errorMessage: string;
  owners: Owner[];

  constructor(private router: Router, private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.ownerService.getOwners().subscribe(
      owners => this.owners = owners,
      error => this.errorMessage = error as any);
  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  addOwner() {
    this.router.navigate(['/owners/add']);
  }

}
