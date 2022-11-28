import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';
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

  ngAfterViewInit() {
    this.datePicker.selectedChange.subscribe((date) => {
      date && this.date$.next(date);
      this.closeDatePickerHelper.nativeElement.click();
    });
  }
}
