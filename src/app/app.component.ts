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
  selectedIndex = 0;
  @ViewChild(MatCalendar) datePicker!: MatCalendar<Date>;
  @ViewChild('closeDatePicker') closeDatePickerHelper!: ElementRef;
  people = [
    { firstName: 'Bernice', lastName: 'Fletcher' },
    { firstName: 'Deann', lastName: 'Stevens' },
    { firstName: 'Samuel', lastName: 'Johnson' },
  ];

  ngAfterViewInit() {
    this.datePicker.selectedChange.subscribe((date) => {
      date && this.date$.next(date);
      this.closeDatePickerHelper.nativeElement.click();
    });
  }
}
