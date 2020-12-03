import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  member: Member = {} as Member;
  readonly galleryOptions: NgxGalleryOptions[] = [{
    width: '500px',
    height: '500px',
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide,
    imagePercent: 100,
    preview: false
  }];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService: MemberService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username') ?? '')
      .subscribe(member => {
        this.member = member;
        this.galleryImages = this.getImages();

      });
  }

  getImages(): NgxGalleryImage[] {
    const images: NgxGalleryImage[] = [];
    for(const photo of this.member.photos) {
      images.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }

    return images;
  }
}
