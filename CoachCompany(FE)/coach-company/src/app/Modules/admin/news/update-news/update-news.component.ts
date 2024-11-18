
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChangeEvent, CKEditorModule} from '@ckeditor/ckeditor5-angular'

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	BalloonToolbar,
	BlockQuote,
	BlockToolbar,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	FullPage,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	HtmlComment,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Image,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Markdown,
	MediaEmbed,
	PageBreak,
	Paragraph,
	PasteFromMarkdownExperimental,
	PasteFromOffice,
	RemoveFormat,
	SelectAll,
	ShowBlocks,
	SimpleUploadAdapter,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Undo,
	type EditorConfig,
	Base64UploadAdapter
} from 'ckeditor5';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../../../../core/services/news.service';
import { UserService } from '../../../../core/services/user.service';
import { News } from '../../../dto/news';

@Component({
  selector: 'app-update-news',
  standalone: true,
  imports: [CommonModule, CKEditorModule,ReactiveFormsModule],
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.css',
	encapsulation: ViewEncapsulation.None

})
export class UpdateNewsComponent implements AfterViewInit,OnInit{
	@ViewChild('editorMenuBarElement') private editorMenuBar!: ElementRef<HTMLDivElement>;
	@ViewChild('ckeditor', { static: false }) ckeditor: any; 
	data: any = `<p>Hello, world!</p>`;
	retrievedata: string = this.data;
	selectedFile!: File;
  newsCurr!: News;
  newsId!: number;

	newsForm = new FormGroup({
		title: new FormControl(''),
		description: new FormControl(''),
		enable: new FormControl(false),
	})
	
	constructor(
		private userService: UserService,
		private newsService: NewsService,
		private changeDetector: ChangeDetectorRef,
		private snackBarService: SnackBarService,
		private router:Router,
    private activeRoute: ActivatedRoute,
	) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.newsId = +params['id'];
      this.loadNews();
    })
  }

  loadNews(): void { 
    const news = this.newsService.getNewsById(this.newsId); 
    this.newsForm.patchValue(news!); 
	this.data = news!.content;
  }
	
	onReady($event: ClassicEditor) {
		throw new Error('Method not implemented.');
	}

	onFileSelected(event: any) { 
		this.selectedFile = event.target.files[0]; 
	}

	public isLayoutReady = false;
	public Editor = ClassicEditor;
	public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
	public ngAfterViewInit(): void {
		this.config = {
			toolbar: {
				items: [
					'undo',
					'redo',
					'|',
					'sourceEditing',
					'showBlocks',
					'|',
					'heading',
					'|',
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'highlight',
					'blockQuote',
					'codeBlock',
					'|',
					'alignment',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AccessibilityHelp,
				Alignment,
				Autoformat,
				AutoImage,
				AutoLink,
				Autosave,
				BalloonToolbar,
				Base64UploadAdapter,
				BlockQuote,
				BlockToolbar,
				Bold,
				Code,
				CodeBlock,
				Essentials,
				FindAndReplace,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				FullPage,
				GeneralHtmlSupport,
				Heading,
				Highlight,
				HorizontalLine,
				HtmlComment,
				HtmlEmbed,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				Markdown,
				MediaEmbed,
				PageBreak,
				Paragraph,
				PasteFromMarkdownExperimental,
				PasteFromOffice,
				RemoveFormat,
				SelectAll,
				ShowBlocks,
				SimpleUploadAdapter,
				SourceEditing,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				Strikethrough,
				Subscript,
				Superscript,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TextTransformation,
				TodoList,
				Underline,
				Undo,
			],			
			balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
			blockToolbar: [
				'fontSize',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'|',
				'link',
				'insertImage',
				'insertTable',
				'|',
				'bulletedList',
				'numberedList',
				'outdent',
				'indent'
			],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'imageStyle:inline',
					'imageStyle:wrapText',
					'imageStyle:breakText',
					'|',
					'resizeImage'
				]
			},
			initialData:
				'',
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},
			menuBar: {
				isVisible: true
			},
			placeholder: 'Nhập nội dung tại đây!',
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			}
		};

		this.isLayoutReady = true;
		this.changeDetector.detectChanges();
	}

	public onChange({ editor }: ChangeEvent) {
		const data = editor.getData();
		this.retrievedata=data;
	}

	backList() {
		this.router.navigate(['admin/news']);
	}
	
	handleUpdateNews(event:Event){
		event.preventDefault();
		const title = this.newsForm.get("title")?.value?.trim()!;
		const description = this.newsForm.get("description")?.value?.trim()!;
		const enable = this.newsForm.get("enable")?.value!;
		
		// Thông báo warning
		if(title==""){
			this.snackBarService.notifyWarning("Vui lòng nhập tiêu đề!");
		
		}else if(description==""){
			this.snackBarService.notifyWarning("Vui lòng nhập mô tả!");
		
		}else { // Thông bảo lỗi và thành công
			this.newsService.updateNews(this.newsId,Number(this.userService.getUser()?.id!),title,description,this.retrievedata,this.selectedFile,enable)
			.subscribe({
				next: (response: News) => {
					this.snackBarService.notifyWarning("Thay đổi thành công");
					const updatedNewsList = this.newsService.getNewsList().map(news => news.id === response.id ? response : news );
					this.newsService.setnewsList(updatedNewsList);
				},
				error: (response:any) => this.snackBarService.notifyError(response.error.message)
			})
		}
	}
}
