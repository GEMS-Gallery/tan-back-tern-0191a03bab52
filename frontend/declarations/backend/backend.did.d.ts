import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface LinkPreview { 'title' : string, 'screenshotUrl' : string }
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'getLinkPreview' : ActorMethod<[string], [] | [LinkPreview]>,
  'saveLinkPreview' : ActorMethod<[string, string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
