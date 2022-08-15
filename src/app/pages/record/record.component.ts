import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { catchError, zip, of } from 'rxjs';

import { CreateDocument, IDocument } from 'src/app/models/document';
import { IEvent } from 'src/app/models/event';
import { ICustomer } from 'src/app/models/customer';
import { IAnimal } from 'src/app/models/animal';

import { EventsService } from 'src/app/services/events.service';
import { CustomersService } from 'src/app/services/customers.service';
import { AnimalsService } from 'src/app/services/animals.service';

import { VisualizeNotesModalComponent } from 'src/app/components/visualize-notes-modal/visualize-notes-modal.component';
import { UploadDocumentModalComponent } from 'src/app/components/upload-document-modal/upload-document-modal.component';

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
  get animal(): IAnimal {
    return this.customer.animals.find(
      (a) => a.id.toString() === this.animalId.toString()
    ) as IAnimal;
  }

  events: IEvent[] = [];
  documents: IDocument[] = [];

  customerEmail: string;
  animalId: string;

  notFound: boolean = false;

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.customerEmail =
      this.route.snapshot.paramMap.get('customerEmail') ?? '';

    zip(
      this.customersService.getClinicCustomer(this.customerEmail),
      this.animalsService.getAnimalDocuments(this.customerEmail, this.animalId),
      this.eventService.getLastRecentEvents(this.customerEmail, this.animalId)
    )
      .pipe(
        catchError(() => {
          this.notFound = true;
          return of([]);
        })
      )
      .subscribe(([customer, documents, events]) => {
        this.customer = customer;
        this.documents = documents;
        this.events = events;
      });
  }

  visualize(event: IEvent) {
    this.modal.open(VisualizeNotesModalComponent, { data: event });
  }

  openUploadModal() {
    this.modal
      .open(UploadDocumentModalComponent, {
        data: { customer: this.customer, animal: this.animal },
      })
      .afterClosed()
      .subscribe((document: CreateDocument | null) => {
        if (!!document) {
          this.animalsService
            .postAnimalDocument(document.customer, document.animal, document)
            .subscribe(() => {
              this.animalsService
                .getAnimalDocuments(this.customerEmail, this.animalId)
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
