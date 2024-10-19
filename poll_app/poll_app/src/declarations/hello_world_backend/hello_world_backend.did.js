export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getQuestion' : IDL.Func([], [IDL.Text], ['query']),
    'getVotes' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'resetVotes' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
    'vote' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
  });
};
export const init = ({ IDL }) => { return []; };
