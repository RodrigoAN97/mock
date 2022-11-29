import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  isDatePickerOpen = false;
  date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  sub!: Subscription;
  @ViewChild(MatCalendar) datePicker!: MatCalendar<Date>;
  @ViewChild('closeDatePicker') closeDatePickerHelper!: ElementRef;
  selectedPerson = 0;
  people = [
    { firstName: 'Bernice', lastName: 'Fletcher' },
    { firstName: 'Deann', lastName: 'Stevens' },
    { firstName: 'Samuel', lastName: 'Johnson' },
  ];
  selectedPlatform = 0;
  platforms = ['Jira', 'Slack', 'Trello', 'None'];
  addNew = false;

  newPerson(event: Event) {
    console.log(event);
    event.stopPropagation();
    this.addNew = true;
  }

  addPerson(event: any) {
    const value = event.target.value;
    const firstName = value.includes(' ') ? value.split(' ')[0] : value;
    const lastName = value.includes(' ') ? value.split(' ')[1] : '';
    this.people.push({ firstName, lastName });
    this.addNew = false;
  }

  ngAfterViewInit() {
    this.sub = this.datePicker.selectedChange.subscribe((date) => {
      date && this.date$.next(date);
      this.closeDatePickerHelper.nativeElement.click();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
