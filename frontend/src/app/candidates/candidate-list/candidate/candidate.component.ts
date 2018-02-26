import { Component, OnInit, Input } from '@angular/core';
import { CandidateDTO } from '../../../api/models/candidate-dto';
import { CandidateService } from '../../service/candidate.service';

@Component({
  selector: '[app-candidate]',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  @Input() candidate: CandidateDTO; 

  constructor() { }

  ngOnInit() {
  }

}
