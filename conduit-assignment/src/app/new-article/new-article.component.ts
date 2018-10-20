import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateArticleService } from './create-article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetArticleService } from './get-article.service';
import { UpdateArticleService } from './update-article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  constructor(private createArticleService: CreateArticleService, private router: Router, private route: ActivatedRoute, private getArticleService: GetArticleService, private updateArticleService: UpdateArticleService) { }

  currentArticle: {'article': {'title': string, 'description': string, 'body': string, 'tagList'?: string[]}};

  articleSlug: string;
  articleToBeUpdated;

  getSlug(){
    if(this.articleSlug){
      return this.articleSlug;
    }
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.articleSlug = params['slug'];
        console.log(this.articleSlug);
      }
    );
    
    this.getArticleService.getArticle(this.getSlug()).subscribe(
      (response) => {
        this.articleToBeUpdated = response.json().article;
      }
    );

  }

  onSubmit(form: NgForm){
    if(form.value.tagList === ''){
      this.currentArticle = {
        'article': {
        'title': form.value.title,
        'description': form.value.description,
        'body': form.value.body
        }
      } 
    } else {
      const tagList = form.value.tagList.split(' ');
      this.currentArticle = {
        'article': {
        'title': form.value.title,
        'description': form.value.description,
        'body': form.value.body,
        'tagList': tagList
        }
      }; 
    }

    this.createArticleService.createNewArticle(this.currentArticle).subscribe(
      (response) => {
        const data = response.json();
      },
      (error) => console.log('Error publishing article'),
      () => {
        alert('Article published!!!');
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(form: NgForm){

    if(form.value.tagList === ''){
      this.currentArticle = {
        'article': {
          'title': (form.value.title === '') ? this.articleToBeUpdated.title: form.value.title,
          'description': (form.value.description === '') ? this.articleToBeUpdated.description: form.value.description,
          'body': (form.value.body === '') ? this.articleToBeUpdated.body: form.value.body
        }
      } 
    } else {
      const tagList = form.value.tagList.split(' ');
      this.currentArticle = {
        'article': {
          'title': (form.value.title === '') ? this.articleToBeUpdated.title: form.value.title,
          'description': (form.value.description === '') ? this.articleToBeUpdated.description: form.value.description,
          'body': (form.value.body === '') ? this.articleToBeUpdated.body: form.value.body,
          'tagList': (form.value.lagList === '') ? this.articleToBeUpdated.tagList: form.value.tagList
        }
      }; 
    }
    this.updateArticleService.updateArticle(this.currentArticle, this.getSlug()).subscribe(
      (response) => {
        const data = response.json().article;
        console.log(data);
      },
      (error) => console.log('Updation failed!!!'),
      () => {
        alert('Article updated!!!')
        this.router.navigate(['/']);
      }
    );
  }
}
