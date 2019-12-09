
// create instance of instantsearch
var search = instantsearch({
  appId: '06N5B5F9IF',
  apiKey: 'a0deab13d94f6b03e80de5ae6270d577',
  indexName: 'candidates',
  routing:true
});

// add search box widget to search instance
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
	placeholder: 'Search For Candidates',
	searchAsYouType: true,
	showLoadingIndicator: true
  })
);

// add stats widget to search instance
search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats'
    })
);

// define hit template in search instance	
var hitTemplate =
  '<article class="hit">' +
	  '<div class="candidate-picture-wrapper">' +
        '<div class="candidate-picture"><img src="{{image}}" /></div>' +
      '</div>' +
      '<div class="candidate-desc-wrapper">' +
        '<div class="candidate-name">{{{CandidateName}}}</div>' +
        '<div class="skills">{{{Skills}}}</div>' +
		'<div class="location">{{Location}}</div>' +
      '</div>' +
  '</article>';

// define no results template in search instance
var noResultsTemplate='<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

// define checkbox capability for refinements
var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{label}}" {{#isRefined}}checked{{/isRefined}} />{{label}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

// define colors for facetTemplate in search instance
var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{label}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

// add the hits widget for search instance
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

// add the pagination widget for search instance
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

// add refinement widget to search instance
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#skills',
    attributeName: 'Skills',
	limit: 10,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Skills</div class="facet-title">'
    }
  })
);


// add refinement widget to search instance
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#location',
    attributeName: 'Location',
    limit: 5,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Location</div class="facet-title">'
    }
  })
);

// add refinement widget to search instance
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

search.start(); //start search


