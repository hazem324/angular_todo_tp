import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {
  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

 constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.suggestionForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z]*$')
        ]
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],

      category: ['', Validators.required],

      date: [{ value: new Date(), disabled: true }],

      status: [{ value: 'en attente', disabled: true }]

    });

  }

  onSubmit() {

  if (this.suggestionForm.valid) {

    const suggestion = {
      ...this.suggestionForm.getRawValue(),
      nbLikes: 0
    };

    console.log(suggestion);

    // reset the form
    this.suggestionForm.reset();

    // redirect to suggestion list
    this.router.navigate(['/suggestions/listSuggestion']);

  }

}

}