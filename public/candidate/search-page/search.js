const searchClient = algoliasearch('06N5B5F9IF', 'a0deab13d94f6b03e80de5ae6270d577');

const search = instantsearch({
  indexName: 'jobs',
  searchClient,
  routing:true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
	placeholder: 'Search For Jobs'
	searchAsYouType: true,
	showLoadingIndicator: true
  })
);

search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats'
    })
);
	
var hitTemplate =
  '<article class="hit">' +
      '<div class="job-desc-wrapper">' +
        '<div class="company-name">{{{_highlightResult.CompanyName.value}}}</div>' +
        '<div class="experience-level">{{{_highlightResult.Experience_Level.value}}}</div>' +
        '<div class="job-type">{{Job_Type}}</div>' +
		'<div class="location">{{Location}}</div>' +
		'<div class="salary">{{Salary}}</div>' +
      '</div>' +
  '</article>';

var noResultsTemplate='<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{label}}" {{#isRefined}}checked{{/isRefined}} />{{label}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{label}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';


search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 15,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);


search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
    },
    showFirstLast: false
  })
);


search.addWidget(
	instantsearch.widgets.refinementList({
		container:'#company-name',
		attributeName:'CompanyName',
		operator:'or',
		limit:10,
		cssClasses:{list:'nav nav-list',count:'badge pull-right',active:'active'}
	})
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#experience-level',
    attributeName: 'Experience_Level',
    operator: 'or',
    limit: 3,
    searchForFacetValues: true,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Experience Level</div class="facet-title">'
    }
  })
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#job-type',
    attributeName: 'Job_Type',
    operator: 'or',
    limit: 7,
    searchForFacetValues: true,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Job Type</div class="facet-title">'
    }
  })
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#location',
    attributeName: 'Location',
    operator: 'or',
    limit: 5,
    searchForFacetValues: true,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Location</div class="facet-title">'
    }
  })
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#salary',
    attributeName: 'Salary',
    operator: 'or',
    limit: 5,
    searchForFacetValues: true,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Salary</div class="facet-title">'
    }
  })
);


search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: true
  })
);

search.start();


