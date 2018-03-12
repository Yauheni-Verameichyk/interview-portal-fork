import { Injectable } from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../../shared/validator/validator-form/form-validator.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { ActivatedRoute } from '@angular/router';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { CandidateDTO } from '../../api/models/candidate-dto';

@Injectable()
export class CandidateService {

    candidateList: Array<CandidateDTO> = new Array<CandidateDTO>();
    showButtonLoad: boolean = true;

    constructor(private candidateControllerService: CandidateControllerService) { }

    fetchCandidateList(quantity?: number) {
        if (quantity === 0) {
            this.candidateList = new Array<CandidateDTO>();
        }
        this.candidateControllerService
            .findAll(quantity)
            .subscribe(candidateList => {
                if (candidateList.length !== 0) {
                    this.candidateList = this.candidateList.concat(candidateList);
                } else {
                    this.showButtonLoad = false;
                }
            }, error => console.log(`Error in candidates list component typy error: ${error}`));
    }

    updateCandidateList() {
        this.fetchCandidateList(0);
        this.showButtonLoad = true;
    }
}
