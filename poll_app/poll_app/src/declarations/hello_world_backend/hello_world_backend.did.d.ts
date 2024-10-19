import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getQuestion' : ActorMethod<[], string>,
  'getVotes' : ActorMethod<[], Array<[string, bigint]>>,
  'resetVotes' : ActorMethod<[], Array<[string, bigint]>>,
  'vote' : ActorMethod<[string], Array<[string, bigint]>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
