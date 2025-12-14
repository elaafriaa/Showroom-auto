import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { CurrencyPipe, NgClass } from '@angular/common';

type SortType = 'none' | 'price-asc' | 'price-desc' | 'brand-asc' | 'brand-desc' | 'color-asc' | 'color-desc';

@Component({
  selector: 'app-search-bar',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit, OnChanges {
@Input() autos:Auto[]=[]
@Output() onSelectAuto=new EventEmitter<Auto>()

selectedAutos: Auto [] = []
currentSort: SortType = 'none'
currentBrandFilter: string = ''

ngOnInit() {
  this.selectedAutos = [...this.autos]
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['autos'] && !changes['autos'].firstChange) {
    this.selectAutoList(this.currentBrandFilter)
  }
}

selectAutoList(brand:string){
  this.currentBrandFilter = brand
  if (!brand || brand.trim() === '') {
    this.selectedAutos = [...this.autos]
  } else {
    this.selectedAutos = this.autos.filter(x=>
      x.brand.toLowerCase().startsWith(brand.toLowerCase()))
  }
  this.applySort()
}

sortCars(sortType: SortType){
  this.currentSort = sortType
  this.applySort()
}

applySort(){
  const sorted = [...this.selectedAutos]
  
  switch(this.currentSort){
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'brand-asc':
      sorted.sort((a, b) => a.brand.localeCompare(b.brand))
      break
    case 'brand-desc':
      sorted.sort((a, b) => b.brand.localeCompare(a.brand))
      break
    case 'color-asc':
      sorted.sort((a, b) => a.color.localeCompare(b.color))
      break
    case 'color-desc':
      sorted.sort((a, b) => b.color.localeCompare(a.color))
      break
    case 'none':
    default:
      // Pas de tri
      break
  }
  
  this.selectedAutos = sorted
}

showDetails(auto:Auto){
  this.onSelectAuto.emit(auto)
}
autoCardBody(){
  return {'card-body':true, 'card':false}
}

}
