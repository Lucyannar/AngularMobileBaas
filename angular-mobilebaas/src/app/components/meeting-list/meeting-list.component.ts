import { DeleteComponent } from './../delete/delete.component';
import { MeetingService } from './../../service/meeting.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'action'];
  meetings = [];
  length: number | undefined;
  totalRecordsPerPage: number =5;
  meetingNameFind: string | undefined;
  meetingDateFind: string | undefined;


  constructor(
    private service: MeetingService,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.findAll(0,'meetingDate',null!);
  }

  findAll(pageNumber: number, sortField: string, filters:string) {
    this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField,filters).subscribe(meetingsReturn =>{
      this.length = meetingsReturn['meeting'];
      this.length = meetingsReturn['page'].size;

    },
    err=>{
      console.log('erro', err);
      console.log('erro status', err.status);
      console.log('erro error', err.error);
      console.log('erro headers', err.headers);
    });
  }

  getServerData(event?:PageEvent){
    this.findAll(event.pageIndex,'meetingDate',null);

  }

  edit(idEdit:string){
    const dialogRef = this.dialog.open(MeetingFormComponent,{
      width: '500px',
      data: idEdit
    })

  dialogRef.afterClosed().subscribe(result =>{
    console.log('The dialog was closed');
  })  
  }

  
  confirmDelete(id:string){
    const dialogRef = this.dialog.open(DeleteComponent,{
      width: '500px',
      data: id
    })

  dialogRef.afterClosed().subscribe(result =>{
    console.log('The dialog was closed');
  })  
  }

  findByParameter(){
    let filters ='';
    if(this.meetingNameFind != null && this.meetingNameFind != ''){
      filters += 'meetingName=' +this.meetingNameFind;
    }

    let newDate: moment.Moment = moment.utc(this.meetingDateFind).local();
    filters+= 'meetingDate='+newDate.format("YYYY-MM-DOTHH:mm:ss")+'.000z';
  }
  this.findAll(0,'meetingDate',filters);
}
