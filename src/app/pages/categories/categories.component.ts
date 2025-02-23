import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService=inject(CategoriesService);
categories:ICategory[]=[];
subCategories:ICategory[]=[];
specificCategory:ICategory={} as ICategory;
getCategories()
{
  this.categoriesService.getCategories().subscribe({
    next:(res) => {
    this.categories =  res.data;
    } 
  })
}
getSpecificCategory(id:string)
{
  this.categoriesService.getSpecificCategory(id).subscribe({
    next:(res) => {
    this.specificCategory =  res.data;
    } 
  })
}
getSubCategory(id:string)
{
  this.categoriesService.getSubCategories(id).subscribe({
    next:(res) => {
      this.subCategories=res.data
    }
  })
}
ngOnInit(): void {
  this.getCategories()
}
}
