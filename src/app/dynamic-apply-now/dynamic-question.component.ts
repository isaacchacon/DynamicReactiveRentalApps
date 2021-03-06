import { Component, Input, forwardRef } from '@angular/core';
import { QuestionBase }     from './question-base';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';



@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicQuestionComponent),
      multi: true
    }
  ]
})
/**
 * Meant to be the class that implements the Control Value Accessor interface.
 */
export class DynamicQuestionComponent implements ControlValueAccessor {
  @Input() question: QuestionBase<any>;
  @Input() disabled = null;
  @Input() formControl:FormControl;
  @Input() idSuffix ='';//utilized when this is inside a form array

  validationErrors = '';
  answer:string;

  //start of date pickr code.
  //will handle input's blur when its closed. (, so it can validate the date or somethign.)
  internalDirty = false;
  handleInputBlur(isCalendarOpened:boolean, dateInputValue:string){
    if(!isCalendarOpened){// we will think of a simple code to handle here.
      // i am thinking moment validation but perhaps there is a simpler way.
      if(this.internalDirty){
        this.onChange(dateInputValue);
        this.internalDirty = false;
      }
      this.onTouched();
    }
  }
  //end of date picker code.
  

  onChange = (answer: string) => {};
  onTouched = () => {};
  
  writeValue(answer: string): void {
    this.answer = answer;
    //this.onChange(this.answer);//jgpending: is this line needed?
  }
  // Save the function as a property to call later here.
  registerOnChange(fn: (answer: string) => void): void {
    this.onChange = fn;
  }
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    if(isDisabled){
        this.disabled=true;
    }else{
        this.disabled=null;// null is better cause it won't show the disabled attribute at all.
    }
  }

  ngOnInit(){
    this.formControl.valueChanges.subscribe(data=> this.onValueChanged(data))
  }

  onValueChanged(data:any){
    this.validationErrors = '';
    const control = this.formControl;
    if (control && control.dirty && !control.valid) {
		   for (const key in control.errors) {
         if(this.question.validationErrors[key]){
  //@Input() idSuffix="";
            this.validationErrors += this.question.validationErrors[key] + '. ';
         }else{
            this.validationErrors+=key +' error not defined in JSON.';
         }
       }
    }
  }
}