import useCommands from "hooks/entities/useCommands";
import useLinks from "hooks/entities/useLinks";
import useSnippets from "hooks/entities/useSnippets";
import {
  SnippetCreateDto,
  SnippetReadDto,
  SnippetUpdateDto,
} from "models/snippets";
import UseCategories from "../hooks/categories/useCategories";
import { CommandCreateDto, CommandReadDto, CommandUpdateDto } from "./command";
import { LinkCreateDto, LinkReadDto, LinkUpdateDto } from "./link";

export type Entity = "command" | "link" | "snippet";

export type EntityReadDto = CommandReadDto | LinkReadDto | SnippetReadDto;

export type EntityCreateDto =
  | CommandCreateDto
  | LinkCreateDto
  | SnippetCreateDto;

export type EntityUpdateDto =
  | CommandUpdateDto
  | LinkUpdateDto
  | SnippetUpdateDto;

export type UseEntityQueryHook =
  | typeof useCommands
  | typeof useLinks
  | typeof useSnippets;

export type UseCategoryQueryHook = typeof UseCategories;
