//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export interface CategoryCreateDto {
    name: string;
    isGroup?: boolean | undefined;
    parentId?: number | undefined;
}

export interface CategoryDisplayOrderDto {
    id?: number;
    displayIndex?: number;
}

export interface CategoryReadDto {
    id?: number;
    name?: string | undefined;
    displayIndex?: number;
    isGroup?: boolean;
    parentId?: number;
    items?: number;
}

export interface CategoryTreeNode {
}

export interface CategoryUpdateDto {
    name: string;
    displayIndex?: number;
    isGroup?: boolean;
    parentId?: number | undefined;
}

export interface CommandCreateDto {
    line: string;
    description: string;
    reference?: string | undefined;
    categoryId?: number;
}

export interface CommandReadDto {
    id?: number;
    line?: string | undefined;
    description?: string | undefined;
    reference?: string | undefined;
    starred?: boolean;
    category?: CategoryReadDto;
    dateCreated?: Date;
}

export interface CommandUpdateDto {
    line: string;
    description: string;
    reference?: string | undefined;
    categoryId?: number;
}

export interface LinkCreateDto {
    url: string;
    title: string;
    categoryId?: number;
}

export interface LinkQuickCreateDto {
    url: string;
    categoryId?: number;
}

export interface LinkReadDto {
    id?: number;
    url?: string | undefined;
    title?: string | undefined;
    previewImageUrl?: string | undefined;
    faviconImageUrl?: string | undefined;
    starred?: boolean;
    category?: CategoryReadDto;
    dateCreated?: Date;
}

export interface LinkUpdateDto {
    url: string;
    title: string;
    categoryId?: number;
}

export interface SnippetCreateDto {
    title?: string | undefined;
    description?: string | undefined;
    code?: string | undefined;
    language?: string | undefined;
    starred?: boolean;
}

export interface SnippetReadDto {
    id?: number;
    title?: string | undefined;
    description?: string | undefined;
    code?: string | undefined;
    language?: string | undefined;
    starred?: boolean;
    dateCreated?: Date;
    dateUpdated?: Date;
}

export interface SnippetUpdateDto {
    title?: string | undefined;
    description?: string | undefined;
    code?: string | undefined;
    language?: string | undefined;
    starred?: boolean;
}

export interface UserSettingsReadDto {
    id?: number;
    commandCategoriesSort?: string | undefined;
    linkCategoriesSort?: string | undefined;
    theme?: string | undefined;
}

export interface UserSettingsUpdateDto {
    id?: number;
    commandCategoriesSort?: string | undefined;
    linkCategoriesSort?: string | undefined;
    theme?: string | undefined;
}