    document.getElementById('generate-btn').addEventListener('click', function() {
        // Define your taxonomy terms and their hierarchy
        var filters = {
            'filter1': [
                {name: 'Visual Skills', children: [
                    {name: 'No or inconsistent visual attention'},
                    {name: 'Limited visual attention', children: [
                        {name: 'With no visual recognition'},
                        {name: 'With limited visual recognition'},
                        {name: 'With variable visual recognition'}
                    ]},
                    {name: 'Good visual attention', children: [
                        {name: 'With no visual recognition'},
                        {name: 'With limited visual recognition'},
                        {name: 'With variable visual recognition'}
                    ]},
                    {name: 'No visual recognition'},
                    {name: 'Limited visual recognition', children: [
                        {name: 'Recognizes 3D only/classes of familiar items'},
                        {name: 'Difficulty with 2D'}
                    ]},
                    {name: '1f Good visual recognition with familiar things'}
                ]},
                {name: 'Hearing/Auditory', children: [
                    {name: 'Hearing loss', children: [
                        {name: 'Some residual hearing'},
                        {name: 'No residual hearing'}
                    ]},
                    {name: 'Auditory processing disorder'}
                ]},
                {name: 'Communication Skills', children: [
                    {name: 'Verbal'},
                    {name: 'Uses sign language'},
                    {name: 'Uses AAC'},
                    {name: 'Uses non-traditional language abilities, etc.'}
                ]},
                {name: 'Motor Issues', children: [
                    {name: 'Lower limb(s)'},
                    {name: 'Upper limb(s)'}
                ]},
                {name: 'Compensatory Skills Use', children: [
                    {name: 'All the time'},
                    {name: 'Sometimes'},
                    {name: 'Depends on the alert state'}
                ]}
            ],
            'filter2': [
                {name: 'Math'},
                {name: 'Literacy/Materials'},
                {name: 'Communication', children: [
                    {name: 'sign language'},
                    {name: 'assistive technology'},
                    {name: 'reliable responses'}
                ]},
                {name: 'Self-Determination and Advocacy', children: [
                    {name: 'Advocacy'},
                    {name: 'Problem-solving'},
                    {name: 'Goal setting'},
                    {name: 'Choice making'}
                ]},
                {name: 'Orientation and Mobility'},
                {name: 'Independent Living', children: [
                    {name: 'Self-care'},
                    {name: 'Home management'},
                    {name: 'Organization skills'}
                ]},
                {name: 'Compensatory Skills', children: [
                    {name: 'Tactile'},
                    {name: 'Auditory cue/verbal label'},
                    {name: 'Prediction'},
                    {name: 'Memory'},
                    {name: 'Color-coding'},
                    {name: 'Reliance on context'},
                    {name: 'Sound cues'},
                    {name: 'Smell'},
                    {name: 'Verbal questioning'}
                ]},
                {name: 'Social Skills', children: [
                    {name: 'Needs structured opportunities'},
                    {name: 'Self-directed'}
                ]},
                {name: 'Recreation and Leisure'},
                {name: 'Sensory Efficiency', children: [
                    {name: 'Visual'},
                    {name: 'Auditory'},
                    {name: 'Tactile'},
                    {name: 'Kinesthetic'},
                    {name: 'Gustatory'},
                    {name: 'Olfactory'}
                ]},
                {name: 'Assistive Technology'},
                {name: 'Social Studies'},
                {name: 'Science'},
                {name: 'Active Learning'},
                {name: 'Environment and positioning'},
                {name: 'Training and services'}
            ],
          'filter3': [
            {name: 'Appearance of the Eye'},
            {name: 'Movement of the Eye'},
            {name: 'Impact of Light'},
            {name: 'Impact of Motion'},
            {name: 'Impact of Color'},
            {name: 'Response Interval'},
            {name: 'Sensory Integration While Using Vision'},
            {name: 'Access to People'},
            {name: 'Impact of Clutter and Crowding'},
            {name: 'Visual Fields'},
            {name: 'Visual Attention'},
            {name: 'Visual Recognition'},
            {name: 'Form Accessibility'},
            {name: 'Visual Guidance of Upper Limbs'},
            {name: 'Visual Guidance of Lower Limbs'},
            {name: 'Visual Curiosity'},
            {name: 'Compensatory Skills'}
        ]
       };

       function generateOutput(term, parent) {
        var output = parent ? parent + '>' + term.name : term.name;
        return output;
    }

    function findTerm(terms, name, prefix) {
        for (var i = 0; i < terms.length; i++) {
            var currentPrefix = prefix ? prefix + '>' + terms[i].name : terms[i].name;
            if (terms[i].name === name) {
                return {term: terms[i], prefix: prefix};
            }
            if (terms[i].children) {
                var term = findTerm(terms[i].children, name, currentPrefix);
                if (term) {
                    return term;
                }
            }
        }
        return null;
    }

    // Generate the output for each filter
    Object.keys(filters).forEach(function(filter) {
        var output = '';
        document.querySelectorAll('input[name="' + filter + '"]:checked').forEach(function(checkbox) {
            var result = findTerm(filters[filter], checkbox.value, '');
            if (result && result.term) {
                output += (output ? '|' : '') + generateOutput(result.term, result.prefix);
            }
        });
        document.getElementById('output-' + filter).value = output;
    });
});

document.querySelectorAll('.select-all').forEach(function(button) {
    var isChecked = false;
    button.addEventListener('click', function() {
        var checkboxes = button.parentElement.querySelectorAll('input[type="checkbox"]');
        isChecked = !isChecked;
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = isChecked;
        });
    });
});

document.getElementById('clear-btn').addEventListener('click', function() {
    // Clear the output for each filter
    ['filter1', 'filter2', 'filter3'].forEach(function(filter) {
        document.getElementById('output-' + filter).value = '';
    });
});
