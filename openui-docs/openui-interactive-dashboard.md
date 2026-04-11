
Rabi Shanker Guha
@rabi_guha
·
2h
2/ Variables are bound automatically

>$days = "7"

Pass `$days` to any input and it binds two-way:
User changes it → the variable updates → every expression using it re-runs.

No boilerplate. No useState. Just the letter $.
0:04 / 0:05
Rabi Shanker Guha
@rabi_guha
·
2h
3/ Queries read data. Mutations write it.

> data = Query("get_sales", {range:$days})
> result = Mutation("create_task", {title:$title})

Queries re-fetch automatically when variables change.
Mutations chain into Actions: Run, Reset, Set.

Wire them to your APIs or MCP tools in
Show more
0:03 / 0:09
Rabi Shanker Guha
@rabi_guha
·
2h
4/ (My favourite) 
Edit mode: the LLM only streams back what changed.

No more regenerating the whole UI on every interaction.

Faster responses
Lower token costs
Full Streaming support
0:03 / 0:22
Rabi Shanker Guha
@rabi_guha
·
2h
5/ (the most requested one)
Inline mode: LLMs can mix text and UI in the same response.

Sometimes you want a paragraph. 
Sometimes a chart. 
Sometimes both.

> Hi, here's an interactive visualisation of your data
> ```openui-lang
> root=Card([...])
> ```

v0.5 allows streaming
Show more
Rabi Shanker Guha
@rabi_guha
·
2h
6/ The problem with LLM dashboards: you can't trust the numbers.

v0.5 fixes it. Aggregations run on the runtime, not the model.

> openCount = Count(Filter(tickets.rows, "status", "==", "open"))

Deterministic. Auditable. Correct.