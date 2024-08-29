export const idlFactory = ({ IDL }) => {
  const LinkPreview = IDL.Record({
    'title' : IDL.Text,
    'screenshotUrl' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getLinkPreview' : IDL.Func([IDL.Text], [IDL.Opt(LinkPreview)], ['query']),
    'saveLinkPreview' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
