import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isDatePickerOpen = false;
  date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
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

  ngAfterViewInit() {
    this.datePicker.selectedChange.subscribe((date) => {
      date && this.date$.next(date);
      this.closeDatePickerHelper.nativeElement.click();
    });
  }
}
