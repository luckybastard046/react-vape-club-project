import sanityClient from '@sanity/client';

export const sanity = sanityClient({
  projectId: 'tdk0czhx',
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: false,
  token: 'skSMU925MZ5dUPqmNP1FUduGnvoPCNB4hXRltZULJibk0fcSe4ZafBtkQ5KJ6zPeyRhFVswRRXFESvXdDxUEMXtVN2IuXlmjxO0qZzgoTQvleAvMhmsnpTnbqVISlAiOgZB0bt4413rI1bDF6Qv1KsT9rAYQh0J4epIp5b6Pdb4yZSk1YEQZ',
  ignoreBrowserTokenWarning: true
});