import { AbstractControl, ValidationErrors } from "@angular/forms";

export function skillValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null;
    }

    const pattern = /^[a-zA-Z\s]+$/;

    if (!pattern.test(value)) {
        return { invalidSkill: true }
    }

    return null;

}