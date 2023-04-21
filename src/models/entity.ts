import { SnippetCreateDto, SnippetReadDto, SnippetUpdateDto } from 'models/snippets';
import { CommandCreateDto, CommandReadDto, CommandUpdateDto } from "./command";
import { LinkCreateDto, LinkReadDto, LinkUpdateDto } from "./link";
import useCommands from "hooks/commands/useCommands";
import useLinks from "hooks/links/useLinks";
import useSnippets from "hooks/snippets/useSnippets";
import UseCategories from "../hooks/categories/useCategories";

export type Entity = "command" | "link" | "snippet";
export type EntityReadDto = CommandReadDto | LinkReadDto | SnippetReadDto;
export type EntityCreateDto = CommandCreateDto | LinkCreateDto | SnippetCreateDto;
export type EntityUpdateDto = CommandUpdateDto | LinkUpdateDto | SnippetUpdateDto;
export type UseEntityQueryHook = typeof useCommands | typeof useLinks | typeof useSnippets;
export type UseCategoryQueryHook = typeof UseCategories;
