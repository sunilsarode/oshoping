import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product =  {} as any;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    // get the id from url
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => {
        this.product = p.payload.val();
      });
    }
  }

  save(product) {
    // console.log(product);
    if (this.id){
        this.productService.update(this.id, product.value);
    }else{
      this.productService.create(product.value);
    }

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete it')){
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit(): void {
  }

}
