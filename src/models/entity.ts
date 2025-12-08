import useCommands from "hooks/entities/useCommands";
import useLinks from "hooks/entities/useLinks";
import UseCategories from "../hooks/categories/useCategories";
import { CommandCreateDto, CommandReadDto, CommandUpdateDto } from "./command";
import { LinkCreateDto, LinkReadDto, LinkUpdateDto } from "./link";

export type Entity = "command" | "link";

export type EntityBasePath = "commands" | "links";

export type EntityReadDto = CommandReadDto | LinkReadDto;

export type EntityCreateDto = CommandCreateDto | LinkCreateDto;

export type EntityUpdateDto = CommandUpdateDto | LinkUpdateDto;

export type UseEntityQueryHook = typeof useCommands | typeof useLinks;

export type UseCategoryQueryHook = typeof UseCategories;
