
// create instance of instantsearch
var search = instantsearch({
  appId: '06N5B5F9IF',
  apiKey: 'a0deab13d94f6b03e80de5ae6270d577',
  indexName: 'jobs',
  routing:true
});

// add search box widget to search instance
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
	placeholder: 'Search For Jobs',
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
	  '<div class="job-picture-wrapper">' +
        '<div class="job-picture"><img src="{{image}}" /></div>' +
      '</div>' +
      '<div class="job-desc-wrapper">' +
        '<div class="company">{{{_highlightResult.CompanyName.value}}}</div>' +
        '<div class="experience">{{{_highlightResult.Experience_Level.value}}}</div>' +
        '<div class="position">{{Job_Type}}</div>' +
		'<div class="location">{{Location}}</div>' +
		'<div class="salary">{{Salary}}</div>' +
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
		container:'#company',
		attributeName:'CompanyName',
		limit: 10,
		autoHideContainer: false,
		templates: {
		   item: facetTemplateCheckbox,
		   header: '<div class="facet-title">Company Name</div class="facet-title">'
		}
	})
);

// add refinement widget to search instance
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#experience',
    attributeName: 'Experience_Level',
	limit: 3,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Experience Level</div class="facet-title">'
    }
  })
);

// add refinement widget to search instance
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#position',
    attributeName: 'Job_Type',
    limit: 7,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Job Type</div class="facet-title">'
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
  instantsearch.widgets.refinementList({
    container: '#salary',
    attributeName: 'Salary',
    limit: 5,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="facet-title">Salary</div class="facet-title">'
    }
  })
);

// add clear all widget to search instance
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

// start search
search.start();

function navigate() {
  top.location.href="../expanded-job-results/expanded-jobs.html";
}


