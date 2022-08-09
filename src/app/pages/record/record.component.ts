import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CreateDocument, IDocument } from 'src/app/models/document';
import { IEvent } from 'src/app/models/event';
import { ICustomer } from 'src/app/models/customer';

import { EventsService } from 'src/app/services/events.service';
import { CustomersService } from 'src/app/services/customers.service';

import { VisualizeNotesModalComponent } from 'src/app/components/visualize-notes-modal/visualize-notes-modal.component';
import { UploadDocumentModalComponent } from 'src/app/components/upload-document-modal/upload-document-modal.component';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private animalsService: AnimalsService,
    private eventService: EventsService,
    private modal: MatDialog,
    private route: ActivatedRoute
  ) {}

  customer: ICustomer;
  events: IEvent[] = [];
  documents: IDocument[] = [];

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.customersService.getClinicCustomer('').subscribe((customer) => {
      this.customer = customer;
    });
    this.animalsService
      .getAnimalDocuments('', animalId)
      .subscribe((documents) => {
        this.documents = documents;
      });
    this.eventService.getLastRecentEvents('').subscribe((events) => {
      this.events = events;
    });
  }

  visualize(event: IEvent) {
    this.modal.open(VisualizeNotesModalComponent, { data: event });
  }

  openUploadModal() {
    this.modal
      .open(UploadDocumentModalComponent)
      .afterClosed()
      .subscribe((document: CreateDocument | null) => {
        if (!!document) {
          this.animalsService
            .postAnimalDocument(document.customer, document.animal, document)
            .subscribe(() => {
              const animalId =
                this.route.snapshot.paramMap.get('animalId') ?? '';
              this.animalsService
                .getAnimalDocuments('', animalId)
                .subscribe((documents) => {
                  this.documents = documents;
                });
            });
        }
      });
  }

  download(document: IDocument) {
    window.open(URL.createObjectURL(document.data as Blob), '_blank');
  }
}
