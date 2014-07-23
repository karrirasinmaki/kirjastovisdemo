(function() {
	var BubbleChart, hankeUtil, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  BubbleChart = (function() {
    function BubbleChart(data) {
      this.hide_details = __bind(this.hide_details, this);
      this.show_details = __bind(this.show_details, this);
      this.move_towards_year = __bind(this.move_towards_year, this);
      this.estimate_circle_diameter = __bind(this.estimate_circle_diameter, this);
      this.get_hanke_short_name = __bind(this.get_hanke_short_name, this);
      this.move_to_location_map = __bind(this.move_to_location_map, this);
      this.move_towards_hankes = __bind(this.move_towards_hankes, this);
      this.format_money_millions = __bind(this.format_money_millions, this);
			this.format_kappale = __bind(this.format_kappale, this);
      this.do_split = __bind(this.do_split, this);
      this.show_viz_type = __bind(this.show_viz_type, this);
      this.move_towards_center = __bind(this.move_towards_center, this);
      this.display_group_all = __bind(this.display_group_all, this);
      this.do_create_circles = __bind(this.do_create_circles, this);
      this.create_circles = __bind(this.create_circles, this);
      this.create_vis = __bind(this.create_vis, this);
      this.update_data = __bind(this.update_data, this);
			this.update_hvuosi = __bind(this.update_hvuosi, this);
      this.kill_forces = __bind(this.kill_forces, this);
      this.create_nodes = __bind(this.create_nodes, this);
      this.get_distinct_values = __bind(this.get_distinct_values, this);
      this.color_by = __bind(this.color_by, this);
      this.remove_colors = __bind(this.remove_colors, this);
      this.sort = __bind(this.sort, this);
      this.get_color_map = __bind(this.get_color_map, this);
			this.get_type_from_key_name = __bind(this.get_type_from_key_name, this);
      this.get_updateSearch = __bind(this.get_updateSearch, this);
			this.get_updateSearchx = __bind(this.get_updateSearch2, this);
			this.get_filter_hvuosi = __bind(this.get_filter_hvuosi, this);
			this.get_update_data = __bind(this.get_update_data, this);
			this.get_update_hvuosi = __bind(this.get_update_hvuosi, this);
      this.get_color_map_lookup_set = __bind(this.get_color_map_lookup_set, this);
      this.get_color_map_Lookup_Kieli = __bind(this.get_color_map_Lookup_Kieli, this);
      this.get_color_map_Lookup_Teema = __bind(this.get_color_map_Lookup_Teema, this);
      this.get_color_map_achievement = __bind(this.get_color_map_achievement, this);
			
      var max_amount;
      this.data = data;
//      this.width = 1350;
//      this.width = 1200;
			this.width = 1100;
      this.height = 6400;
      window.width = this.width;
      window.height = this.height;
      this.tooltip = CustomTooltip("my_tooltip", 300);
      this.damper = 0.1;
      this.vis = null;
//			this.data = null;
//      this.all_data = null;
      this.nodes = [];
      this.forces = [];
      this.circles = null;
      max_amount = 1173620 * 1.21;
      this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, 110]);
      console.log('max_amount ' + max_amount);
      console.log(this.radius_scale);
      this.create_nodes(this.data);
      this.create_vis();
    }

    BubbleChart.prototype.create_nodes = function(data) {
      this.nodes = [];
      data.forEach((function(_this) {
        return function(d) {
          var node, radius;
          node = {
            id: d.id,
            original: d,
            radius: _this.radius_scale(parseInt(d.amount)),
            value: parseFloat(d.amount),
						lkm_value: parseFloat(d.lkm),
            name: d.hanke_name,
//            org: 'org',
//            group: 'group',
            kunta: d.Kunta,
//            reg_no: d.reg_no,
						kohderyhma: d.Kohderyhma,
//						kohderyhma2: d.Kohderyhma2,
            teema: d.Lookup_Teema,
						toteuttaja: d.Toteuttaja,
						vaikutusalue: d.Lookup_Vaikutusalue,
						maakunta: d.Lookup_Maakunta,
//						apvm: d.apvm,
//						lpvm: d.lpvm,
//						avustus: d.amount2,
						hvuosi: d.Vuosi,
//						tila: d.Tila,
						lkm: d.lkm,
						kieli: d.Lookup_Kieli,
						tyyppi: d.Lookup_Hanketyyppi,
//            vuosi: d.Vuosi,
            testi_year: d.vuosi.split('-')[1],
						link: d.link,
            x: Math.random() * 1,
            y: Math.random() * 800
          };
          radius = _this.radius_scale(parseInt(d.amount));
          if (radius < 0) {
            console.log("Radius less than 0 for node! " + JSON.stringify(node));
          }
          return _this.nodes.push(node);
        };
      })(this));
      this.nodes.sort(function(a, b) {
        return b.value - a.value;
      });
      return window.nodes = this.nodes;
    };

    BubbleChart.prototype.kill_forces = function() {
      return this.forces.forEach((function(_this) {
        return function(force) {
          force.stop();
          return force.nodes([]);
        };
      })(this));
    };
		
		BubbleChart.prototype.update_data = function() {
			data = raw_records;
			filter_hvuosi(root.options.hvuosi);
		};
		
//    BubbleChart.prototype.update_data = function(records) {
//      var func;
//      this.kill_forces();
//			filter_hvuosi(root.options.hvuosi);
//      this.create_nodes(records);
//      this.create_circles();
//      func = $('.viz_nav.btn.selected').data('name');
//      if (func == null) {
//        func = 'year';
//      }
//        if (func === 'hanke') {
//        this.do_split(function(d) {
//          return d.name;
//        });
//      }
//      console.log("func is " + func);
//      return this.show_viz_type(func);
//    };

    BubbleChart.prototype.create_vis = function() {
      this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
      window.viz = this.vis;
      return this.create_circles();
    };

    BubbleChart.prototype.create_circles = function() {
      this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
        return d.id;
      });
      return this.do_create_circles(this.circles);
    };

    BubbleChart.prototype.do_create_circles = function(circles) {
      var that;
      that = this;
			 if(window.Touch) { /* JavaScript for your touch interface */
			  this.circles.enter().append("circle").attr("r", 0).attr("opacity", 1).style("fill", (function(_this) {
         return function(d) {
           return '#cfcfcf'; // harmaa
         };
        })(this)).attr("stroke-width", 2).attr("stroke", (function(_this) {
         return function(d) {
           return '#404040'; // tummanharmaa
				 };
        })(this)).attr("id", function(d) {
         return "bubble_" + d.id;
			  }).on("click", function(d, i) {
         that.show_details(d, i, this);
//        }).on("mouseout", function(d, i) {
//         that.hide_details(d, i, this);
//        }).on("click", function(d, i) {
//			   var url;
//           url = "http://";
//					 if(window.Touch) { /* JavaScript for your touch interface */ 
//             url += d.link;
//					 } else {
//					   url += d.link+"?language=sv";
//					 }
//           window.open(url);
        }).attr("r", function(d) {
         return d.radius;
        });
			 } else {
			  this.circles.enter().append("circle").attr("r", 0).attr("opacity", 1).style("fill", (function(_this) {
         return function(d) {
           return '#cfcfcf'; // harmaa
         };
        })(this)).attr("stroke-width", 2).attr("stroke", (function(_this) {
         return function(d) {
           return '#404040'; // tummanharmaa
				 };
        })(this)).attr("id", function(d) {
         return "bubble_" + d.id;
			  }).on("mouseover", function(d, i) {
         that.show_details(d, i, this);
        }).on("mouseout", function(d, i) {
         that.hide_details(d, i, this);
        }).on("click", function(d, i) {
			   var url;
           url = "http://";
					 if(window.Touch) { /* JavaScript for your touch interface */ 
             url += d.link;
					 } else {
					   url += d.link+"?language=sv";
					 }
           window.open(url);
        }).attr("r", function(d) {
         return d.radius;
        });
			 }
      return circles.exit().remove();
    };

    BubbleChart.prototype.charge = function(d) {
      return -(Math.pow(d.radius, 2.0) / 7) + -(d.radius * 0.1) + -.3;
    };

    BubbleChart.prototype.display_group_all = function() {
      var center_label, force, formatted_total, radius, titles, total_amount;
      this.kill_forces();
      force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
      this.forces = [force];
      radius = this.estimate_circle_diameter(this.nodes) / 2;
      this.center = {
        x: this.width / 2,
//        y: radius + 80
				y: radius + 40
      };
      force.gravity(0).theta(1.1).charge(this.charge).chargeDistance(Infinity).friction(0.9).on("tick", (function(_this) {
        return function(e) {
          return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function(d) {
            return d.x;
          }).attr("cy", function(d) {
            return d.y;
          });
        };
      })(this));
      force.start();
      total_amount = d3.sum(this.nodes, function(d) {
        return d.value;
      });
			force.start();
      total_kpl_amount = d3.sum(this.nodes, function(d) {
        return d.lkm_value;
      });
      formatted_total = this.format_money_millions(total_amount);
			kpl_total = this.format_kappale(total_kpl_amount);
      center_label = [
        {
          text: 'Kokonaissumma',
          "class": 'header',
          dx: radius + 30,
          dy: 80
        }, {
          text: total_kpl_amount + ' hanketta',
          "class": 'amount',
          dx: radius + 30,
          dy: 120
				}, {
          text: formatted_total,
          "class": 'amount',
          dx: radius + 30,
          dy: 100
        }
      ];
      titles = this.vis.selectAll('text.titles').remove();
      titles = this.vis.selectAll('text.titles').data(center_label, function(d) {
        return d.text;
      });
      titles.enter().append('text').text(function(d) {
        return d.text;
      }).attr('class', (function(_this) {
        return function(d) {
          return "titles year " + d["class"];
        };
      })(this)).attr('x', (function(_this) {
        return function(d) {
          return _this.center.x + d.dx;
        };
      })(this)).attr('y', (function(_this) {
        return function(d) {
          return _this.center.y + d.dy;
        };
      })(this));
      return titles.exit().remove();
    };

    BubbleChart.prototype.move_towards_center = function(alpha) {
      return (function(_this) {
        return function(d) {
          d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
          return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
        };
      })(this);
    };

    BubbleChart.prototype.show_viz_type = function(func) {
      var accessor, category_titles, sort_func;
      if (func === 'hanke') {
        this.do_split(function(d) {
          return d.name;
        });
      }
      if (func === 'kunta') {
        this.do_split(function(d) {
          return d.kunta;
        });
      }
			if (func === 'vaikutusalue') {
        this.do_split(function(d) {
          return d.vaikutusalue;
        });
      }
			if (func === 'maakunta') {
        this.do_split(function(d) {
          return d.maakunta;
        });
      }
			if (func === 'hvuosi') {
        this.do_split(function(d) {
          return d.hvuosi;
        });
			}
			if (func === 'tyyppi') {
        this.do_split(function(d) {
          return d.tyyppi;
        });
			}
//      if (func === 'expenditure') {
//        category_titles = {
//          communication: 'Communication & Outreach',
//          overhead: 'Overhead',
//          staff: 'Staff & Professional Services',
//          contributions: 'Contributions',
//          fees: 'Taxes & Fees',
//          other: 'Other'
//        };
//        accessor = function(d) {
//          return d.super_category;
//        };
//        this.do_split(accessor, {
//          charge: (function(_this) {
//            return function(d) {
//              return _this.charge(d) * 1.3;
//            };
//          })(this),
//          title_accessor: function(category) {
//            return category_titles[category];
//          }
//        });
//      }
//      if (func === 'island') {
//        this.do_split(function(d) {
//          return hanke_utils.get_island(d);
//        });
//      }
      if (func === 'teema') {
        this.do_split(function(d) {
          return d.teema;
        });
      }
      if (func === 'amount') {
        console.log('do nothing');
        accessor = function(d) {
          if (d.value > 1e6) {
            return "Yli miljoonan";
          } else if (d.value > 500000) {
            return "500,000-1 miljoona";
          } else if (d.value > 250000) {
            return "250,000-500,000";
          } else if (d.value > 200000) {
            return "200,000-250,000";
          } else if (d.value > 150000) {
            return "150,000-200,000";
          } else if (d.value > 100000) {
            return "100,000-150,000";
          } else if (d.value > 50000) {
            return "50,000-100,000";
          } else if (d.value > 25000) {
            return "25,000-50,000";
          } else if (d.value > 20000) {
            return "20,000-25,000";
          } else if (d.value > 15000) {
            return "15,000-20,000";
          } else if (d.value > 10000) {
            return "10,000-15,000";
          } else if (d.value > 5000) {
            return "5,000-10,000";
          } else if (d.value > 1000) {
            return "1,000-5,000";
          } else {
            return "< 1,000";
          }
        };
        sort_func = function(a, b) {
          var get_amount;
          get_amount = function(d) {
            var $_pos, amount_str, end_pos;
            $_pos = d.indexOf('$') + 1;
            end_pos = d.indexOf(' ', $_pos);
            amount_str = d.substring($_pos, end_pos);
            return parseInt(amount_str.replace(/,/g, ''));
          };
          if (a === "Yli miljoona") {
            return -1;
          }
          if (b === "Yli miljoona") {
            return 1;
          }
          if (a === "< 1,000") {
            return 1;
          }
          if (b === "< 1,000") {
            return -1;
          }
          return d3.descending(get_amount(a), get_amount(b));
        };
        this.do_split(accessor, {
          sort: sort_func,
          view_by_amount: true
        });
      }
      if (func === 'year') {
        return this.display_group_all();
      }
    };

    BubbleChart.prototype.do_split = function(accessor, options) {
      var charge, force_map, line_height, line_offset, location_map, padding, title_accessor, titles;
      if (options == null) {
        options = {};
      }
      location_map = this.move_to_location_map(this.nodes, accessor, options);
      charge = options.charge != null ? options.charge : this.charge;
      this.kill_forces();
      this.forces = [];
      force_map = location_map.keys().map((function(_this) {
        return function(key) {
          var force, nodes;
          nodes = _this.nodes.filter(function(d) {
            return key === accessor(d);
          });
          force = d3.layout.force().nodes(nodes).size([_this.width, _this.height]);
          _this.forces.push(force);
          return {
            force: force,
            key: key,
            nodes: nodes
          };
        };
      })(this));
      force_map.forEach((function(_this) {
        return function(force) {
          var circles;
          circles = _this.vis.selectAll("circle").filter(function(d) {
            return force.key === accessor(d);
          });
          force.force.gravity(0).theta(1.0).charge(charge).chargeDistance(Infinity).friction(0.85).on("tick", function(e) {
            return circles.each(_this.move_towards_hankes(e.alpha, location_map, accessor)).attr('cx', function(d) {
              return d.x;
            }).attr('cy', function(d) {
              return d.y;
            });
          });
          return force.force.start();
        };
      })(this));
      titles = this.vis.selectAll('text.titles').remove();
      title_accessor = options.title_accessor != null ? function(d) {
        return options.title_accessor(d.key);
      } : function(d) {
        return d.key;
      };
      titles = this.vis.selectAll('text.titles').data(location_map.values(), function(d) {
        return d.key;
      });
      padding = options.view_by_amount != null ? padding = 90 : padding = 55;
      line_height = 20;
      line_offset = function(d, line_num) {
        return d.y + d.radius + padding + line_height * line_num;
      };
      titles.enter().append('text').attr("class", "titles header").text(title_accessor).attr("text-anchor", "middle").attr('x', function(d) {
//			titles.enter().append('text').attr("class", "titles header").text(title_accessor).attr("text-anchor", "middle").attr('x', function(d) {
        return d.x;
      }).attr('y', function(d) {
        return line_offset(d, 0);
      });
      titles.enter().append('text').attr('class', 'titles amount').text((function(_this) {
        return function(d) {
          return _this.format_money_millions(parseFloat(d.sum));
        };
      })(this)).attr('text-anchor', 'middle').attr('x', function(d) {
        return d.x;
      }).attr('y', function(d) {
        return line_offset(d, 1);
      });
			titles.enter().append('text').attr('class', 'titles amount2').text((function(_this) {
        return function(d) {
          return _this.format_kappale(parseFloat(d.kpl_sum));
//					return d.kpl_sum;
        };
      })(this)).attr('text-anchor', 'middle').attr('x', function(d) {
        return d.x;
      }).attr('y', function(d) {
        return line_offset(d, 2);
      });
      return titles.exit().remove();
    };

    BubbleChart.prototype.format_money_millions = function(amount_in_euros) {
      var amount_in_millions;
      amount_in_millions = amount_in_euros / 1e6;
      if (amount_in_millions <= 0.01) {
        return "< 0.01 miljoonaa";
      } else {
        return d3.format(',.2f')(amount_in_millions) + ' milj. euroa';
      }
    };
		
		BubbleChart.prototype.format_kappale = function(amount_kappaleet) {
      var amount_kpl_yhteensa;
      amount_kpl_yhteensa = amount_kappaleet;
      if (amount_kpl_yhteensa <= 1) {
        return "1 hanke";
      } else {
//        return d3.format(',.2f')(amount_in_millions2) + ' kappaletta';
				return (amount_kpl_yhteensa) + ' hanketta';				
      }
    };

    BubbleChart.prototype.move_towards_hankes = function(alpha, location_map, accessor) {
      return (function(_this) {
        return function(d) {
          var target;
          target = location_map.get(accessor(d));
          d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
          return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
        };
      })(this);
    };

    BubbleChart.prototype.move_to_location_map = function(nodes, grouping_func, func, options) {
      var col_num, get_height, get_width, groupings_per_row, groups, label_padding, max_num_in_row, max_num_rows, min_grouping_height, min_grouping_width, num_in_row, padding, prev_radius, prev_y, sort;
      if (options == null) {
        options = {};
      }
      min_grouping_width = 300;
      groupings_per_row = Math.floor(this.width / min_grouping_width) - 1;
      min_grouping_height = 450;
      get_width = (function(_this) {
        return function(i) {
          return ((i % groupings_per_row) + 1) * min_grouping_width;
        };
      })(this);
      get_height = (function(_this) {
        return function(i) {
          var num_row;
          num_row = Math.floor(i / groupings_per_row) + 1;
          return num_row * min_grouping_height - 100;
        };
      })(this);
      groups = d3.nest().key(grouping_func).rollup((function(_this) {
        return function(leaves) {
          return {
            sum: d3.sum(leaves, function(d) {
              return parseFloat(d.value);
            }),
						kpl_sum: d3.sum(leaves, function(d) {
              return parseFloat(d.lkm_value);
            }),
            hankes: d3.set(leaves.map(_this.get_hanke_short_name)).values(),
//            radius: _this.estimate_circle_diameter(leaves) / 2
						radius: _this.estimate_circle_diameter(leaves) / 3
          };
        };
      })(this)).map(nodes, d3.map);
      max_num_rows = 5;
      padding = options.view_by_amount != null ? 80 : 30;
      label_padding = 90;
      col_num = prev_radius = 0;
      num_in_row = 1;
      max_num_in_row = 6;
      prev_y = options.view_by_amount != null ? -90 : -60;
			  if (func === 'kunta') {
			    sort = options.sort != null ? options.sort : function(a, b) {
          return d3.ascending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
					};
			  } else {
				  sort = options.sort != null ? options.sort : function(a, b) {
				  return d3.descending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
			  }
          };
			  
//      sort = options.sort != null ? options.sort : function(a, b) {
//			  if (func === 'kunta') {
//          return d3.ascending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
//				} else {
//				  return d3.descending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
//				}
//      };
      groups.keys().sort(sort).forEach((function(_this) {
        return function(key, index) {
          var entry, min_width, num_left_in_layout, prev_num_in_row, x, y;
          entry = groups.get(key);
          entry['key'] = key;
          if (col_num >= num_in_row) {
            col_num = 0;
          }
          if (col_num === 0) {
            prev_num_in_row = num_in_row;
            while ((_this.width / num_in_row) > entry.radius * 2 + padding * 3) {
              num_in_row += 1;
            }
            num_in_row -= 1;
            num_left_in_layout = groups.keys().length - index;
            if (num_in_row > num_left_in_layout) {
              if (!(num_left_in_layout > groups.keys().length - 1)) {
                num_in_row = prev_num_in_row;
              }
            }
            num_in_row = Math.min(max_num_in_row, num_in_row);
          }
          min_width = _this.width / num_in_row;
          x = min_width * col_num + min_width / 2;
          if (col_num === 0) {
            y = prev_y + prev_radius + entry.radius + padding * 2 + label_padding;
            prev_y = y;
            prev_radius = entry.radius;
          }
          y = prev_y;
          entry['x'] = x;
          entry['y'] = y;
          entry['radius'] = prev_radius;
          groups.set(key, entry);
          return col_num += 1;
        };
      })(this));
      return groups;
    };


    BubbleChart.prototype.get_hanke_short_name = function(d) {
      return d.name.split(',')[0] + (" (" + d.kunta[0] + ")");
    };

    BubbleChart.prototype.estimate_circle_diameter = function(nodes) {
      var area, diameter, estimated_diameter;
      area = d3.sum(nodes, function(d) {
        return Math.PI * Math.pow(d.radius, 2);
      });
      diameter = 2 * Math.sqrt(area / Math.PI);
      estimated_diameter = (Math.log(nodes.length) / 140 + 1) * diameter;
      return estimated_diameter;
    };

    BubbleChart.prototype.move_towards_year = function(alpha) {
      return (function(_this) {
        return function(d) {
          var target;
          target = _this.year_centers[d.vuosi];
          d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
          return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
        };
      })(this);
    };

		BubbleChart.prototype.updateSearch = function(searchTerm) {
      var searchRegEx;
      searchRegEx = new RegExp(searchTerm.toLowerCase());
      return this.circles.each(function(d) {
        var element, match;
        element = d3.select(this);
        match = d.name.toLowerCase().search(searchRegEx);
        if (searchTerm.length > 0 && match >= 0) {
//          element.style("fill", "#F38630").style("stroke-width", 2.0).style("stroke", "#555");
//					element.style("stroke-width", 4.0).style("stroke", "#000000");  //  #000000
//					element.style("stroke-width", 1.0).style("opacity", 1);
          element.style("stroke-width", 4.0).style("stroke", "#000000");  //  #000000 
//					element.style("stroke-width", 4.0).style("stroke", "#000000");
          return d.searched = true;
        } else {
          d.searched = false;
					  element.style("stroke-width", 2.0).style("stroke", "#555");
        }
      });
    };
		
//		BubbleChart.prototype.updateSearchx = function(searchTermx) {
//		BubbleChart.prototype.updateSearchx = function(searchtesti) {
//      var regex;
//      var regex;
//			var comma = "x";
//			var regex = /(searchtesti)/gi; 
//      var testi = searchtesti.split(",");
//      regex = new RegExp(testi);
//			regex = new RegExp(searchtesti);
//		  var input = "your input string";
//			return this.circles.each(function(d) {
//			   var element, match;
//         element = d3.select(this);
//		     if(regex.test(d.kohderyhma2.toLowerCase())) { 
//			     var matches = d.kohderyhma2.toLowerCase().match(regex); 
//		       for(var match in matches) { 
//					 element.style("stroke-width", 1.0).style("opacity", 1);
//           return d.searched = true; 
//			   } 
//		     } else { 
//		       d.searched = false;
//				     element.style("stroke-width", 1.0).style("opacity", 0.1); 
//		     }
//			});	 
//		};	
//			var searchRegEx;
//			var word;
//      searchRegEx1 = "vanhukset;"+" nuoret";
//			searchRegEx = new RegExp(searchTermx.toLowerCase());
//			searchRegEx = new RegExp(searchtesti.toLowerCase());
//			searchRegEx = /(searchtesti.toLowerCase())/gi;
//			var word = searchRegEx.split(" ");
//      return this.circles.each(function(d) {
//        var element, match;
//        element = d3.select(this);
//        match = d.kohderyhma2.toLowerCase().search(searchRegEx);
//				match = d.kohderyhma2.toLowerCase().search(/nuoret/);
//				match = d.kohderyhma2.toLowerCase().search(word);
//        if (searchTermx.length > 0 && match >= 0) {
//				if (searchtesti.length > 0 && match >= 0) {
//				if (match >= 0) {
//          element.style("fill", "#F38630").style("stroke-width", 2.0).style("stroke", "#555");
//					element.style("stroke-width", 4.0).style("stroke", "#000000");  //  #000000
//					element.style("stroke-width", 1.0).style("opacity", 1);
//          return d.searched = true;
//        } else {
//          d.searched = false;
//					  element.style("stroke-width", 1.0).style("opacity", 0.1);
//        }
//      });
//    };
		
//		BubbleChart.prototype.updateSearchx = function(searchTermx, searchTermy, searchTermz) {
		BubbleChart.prototype.updateSearchx = function(searchtesti) {
//      var searchRegEx;
//      searchRegEx1 = "vanhukset;"+" nuoret";
			searchRegEx = new RegExp(searchTermx.toLowerCase());
//			searchRegEx = new RegExp(searchTermx.toLowerCase());
      return this.circles.each(function(d) {
        var element, match;
        element = d3.select(this);
        match = d.kohderyhma.toLowerCase().search(searchRegEx);
        if (searchTermx.length > 0 && match >= 0) {
//				if (searchTermx.length > 0 && match >= 0) {
//          element.style("fill", "#F38630").style("stroke-width", 2.0).style("stroke", "#555");
//					element.style("stroke-width", 4.0).style("stroke", "#000000");  //  #000000
					element.style("stroke-width", 1.0).style("opacity", 1);
          return d.searched = true;
        } else {
          d.searched = false;
					  element.style("stroke-width", 1.0).style("opacity", 0.1);
        }
      });
    };
		
    BubbleChart.prototype.show_details = function(data, i, element) {
      var content;
//      d3.select(element).attr("stroke", "black");
//      content = "<div class=\"inner_tooltip\">";
//        content = "<span class=\"name\">" + title + ":</span><span class=\"value\"> " + value + "</span><br/>";
				content = "<span class=\"name\">" + data.name + "</span><br/><br/>";
				content += "<span class=\"name\">Toteuttajan nimi:</span><span class=\"value\"> " + data.toteuttaja + "</span><br/>";
				content += "<span class=\"name\">Teema:</span><span class=\"value\"> " + data.teema + "</span><br/>";
				content += "<span class=\"name\">Maakunta:</span><span class=\"value\"> " + data.maakunta + "</span><br/>";
				content += "<span class=\"name\">Kunta:</span><span class=\"value\"> " + data.kunta + "</span><br/>";
				content += "<span class=\"name\">Vaikutusalue:</span><span class=\"value\"> " + data.vaikutusalue + "</span><br/>";
				content += "<span class=\"name\">Kohderyhm&auml;:</span><span class=\"value\"> " + data.kohderyhma + "</span><br/>";
//				content += "<span class=\"name\">Kohderyhm&aumltesti;:</span><span class=\"value\"> " + data.kohderyhma2 + "</span><br/>";
				content += "<span class=\"name\">Hanketyyppi:</span><span class=\"value\"> " + data.tyyppi + "</span><br/>";
				content += "<span class=\"name\">Vuosi:</span><span class=\"value\"> " + data.hvuosi + "</span><br/>";
//				content += "<span class=\"name\">Tila:</span><span class=\"value\"> " + data.tila + "</span><br/>";
//				content += "<span class=\"name\">Aloitus pvm:</span><span class=\"value\"> " + data.apvm + "</span><br/>";
//				content += "<span class=\"name\">P&auml;&auml;ttymis pvm:</span><span class=\"value\"> " + data.lpvm + "</span><br/>";
//				content += "<span class=\"name\">Budjetti:</span><span class=\"value\"> " + (addCommas(data.value)) + " euroa" + "</span><br/>";
				content += "<span class=\"name\">My&ouml;nnetty avustus:</span><span class=\"value\"> " + (addCommas(data.value)) + " euroa" + "</span><br/>";
//        content += "</div>";
//			}
        this.tooltip.showTooltip(content, d3.event);
//        return d3.select(element).move_to_front();
    };

    BubbleChart.prototype.filter_hvuosi = function(hvuosi) {
      return data = data.filter(function(d) {
        if (hvuosi === "all") {
          return true;
        } else {
          return d.hvuosi === hvuosi;
        }
      });
		};
		
		BubbleChart.prototype.hide_details = function(data, i, element) {
      d3.select(element).attr("stroke", '#404040');
      return this.tooltip.hideTooltip();
    };

//    BubbleChart.prototype.get_color_map_achievement = function(allValuesArray) {
//    var color_map, value, _i, _len;
//    color_map = {};
//    for (_i = 0, _len = allValuesArray.length; _i < _len; _i++) {
//      value = allValuesArray[_i];
//      if (value <= -2) {
//        color_map[value] = '#ff0000';
//      } else if (value <= -1) {
//        color_map[value] = '#ff9900';
//      } else if (value <= 0) {
//        color_map[value] = '#ffff00';
//      } else if (value < 2) {
//        color_map[value] = '#00FF00';
//      } else {
//        color_map[value] = '#FF00CC';
//      }
//    }
//    return color_map;
//  };

  BubbleChart.prototype.get_color_map_Lookup_Kieli = function(allValuesArray) {
    var color_map, value, _i, _len;
    color_map = {};
    for (_i = 0, _len = allValuesArray.length; _i < _len; _i++) {
      value = allValuesArray[_i];
      switch (value) {
        case "fi":
          color_map[value] = '#22adff';
          break;
        case "sv":
          color_map[value] = '#ccff00';
          break;
        default:
          color_map[value] = '#d62728';
      }
    }
    console.log(color_map);
    return color_map;
  };

  BubbleChart.prototype.get_color_map_Lookup_Teema = function(allValuesArray) {
    var color_map, value, _i, _len;
    color_map = {};
    for (_i = 0, _len = allValuesArray.length; _i < _len; _i++) {
      value = allValuesArray[_i];
      switch (value) {
        case "Digitointi":
          color_map[value] = '#fdbf6f'; 
          break;
        case "Henkilöstön osaaminen":
          color_map[value] = '#ff7f00'; 
          break;
        case "Kokoelmat":
          color_map[value] = '#ffff99'; 
          break;
				case "Laitehankinnat":
          color_map[value] = '#b2df8a'; 
          break;
				case "Lukemisen edistäminen":
          color_map[value] = '#33a02c'; 
          break;
				case "Mediaskasvatus":
          color_map[value] = '#cab2d6';
          break;
				case "Oppimisympäristö ja yhteisöllisyys":
          color_map[value] = '#a6cee3';
          break;
				case "Palvelujen kehittäminen":
          color_map[value] = '#1f78b4';
          break;
				case "Strateginen kehittäminen":
          color_map[value] = '#6a3d9a';
          break;
				case "Tilasuunnittelu":
          color_map[value] = '#fb9a99'; 
          break;
				case "Verkkopalvelut":
          color_map[value] = '#e31a1c'; 
          break;
        default:
          color_map[value] = '#DA635D';
      }
    }
    console.log(color_map);
    return color_map;
  };

  BubbleChart.prototype.get_color_map_lookup_set = function(allValuesArray) {
    var baseArray, color_map, index, value, _i, _len;
//    baseArray = ["#98df8a", "#d62728", "#1f77b4", "#f7b6d2", "#7f7f7f", "#ffbb78", "#2ca02c", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#FFFF33", "#e377c2", "#aec7e8", "#ff7f0e", "#00FF00", "#E00000", "#00FFFF"];
//    baseArray = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
//    baseArray = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"];
//    baseArray = ["#51574a", "#447c69", "#74c493", "#e2975d", "#f19670", "#e16552", "#c94a53", "#be5168", "#a34974", "#993767", "#65387d", "#4e2472", "#9163b6", "#e279a3", "#e0598b", "#7c9fb0", "#5698c4", "#9abf88"];  
//		baseArray = ["#ff0400", "#00e66b", "#ffe380", "#b6c3f2", "#46394d", "#73321d", "#403e00", "#79f2d0", "#0020f2", "#fd80ff", "#ff8f40", "#ddff00", "#00474d", "#000659", "#590027", "#8c7a69", "#16592e", "#00b6f2", "#7979f2", "#ff80a8"]; 
//		baseArray = ["#ff8c8c", "#a7ff8c", "#8ca3ff", "#689451", "#945177", "#ffc88c", "#8cffd1", "#ba8cff", "#51947d", "#ffad8c", "#8cfdff", "#945651", "#518b94", "#ffe08c", "#ff8cde", "#947a51", "#517394", "#f2ff8c", "#8ccbff", "#949251", "#515694"];
		baseArray = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#bf812d", "#ff7f00", "#cab2d6", "#6a3d9a", "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"];
//		baseArray = ["#33FF1D", "#FF0D29", "#326FCC", "#CCFF2A", "#FF8810","#BA30FF", "#6EFFCE","#008000", "#EA8BFF", "#CCB780","#A1B2AD", "#B2054B", "#4DB20A","#FFF9DD","#05B2B1", "#FFF969", "#00FF63", "#B89FCC", "#A02820"];
//																		 						keltainen  oranssi
//		baseArray = ["#008000", "FF0000", "#0000FF", "#FFFF00", "#F080F0", "#FFA000", "#FFFFFF", "#00FFFF", "#A02820", "#80FF00", "#808080", "#008080", "#800000", "#FF00FF", "#000000", "#00FF00", "#000080", "#808000", "#800080", "#C0C0C0"];
//						   vihre�,    punainen    sininen   keltainen   violetti  oranssi  valkoinen      aqua      ruskea  haaleanvihre� harmaa    teal       maroon      fuchsia    musta      lime       navy      oliivi      purple    hopea
		index = 0;
    color_map = {};
    for (_i = 0, _len = allValuesArray.length; _i < _len; _i++) {
      value = allValuesArray[_i];
      color_map[value] = baseArray[index];
      index = index + 1;
      if (index >= baseArray.length) {
        index = 0;
      }
    }
    return color_map;
  };

  BubbleChart.prototype.get_type_from_key_name = function(keyName) {
    if (/^Lookup_Kieli/.test(keyName)) {
      return "Lookup_Kieli";
    }
    if (/^Lookup_Teema/.test(keyName)) {
      return "Lookup_Teema";
    }
    return "Other";
  };

  BubbleChart.prototype.get_color_map = function(keyName, allValuesArray) {
    var key_type;
    key_type = this.get_type_from_key_name(keyName);
    switch (key_type) {
      case "Lookup_Kieli":
        return this.get_color_map_Lookup_Kieli(allValuesArray);
      case "Lookup_Teema":
        return this.get_color_map_Lookup_Teema(allValuesArray);
      default:
        return this.get_color_map_lookup_set(allValuesArray);
    }
  };

  BubbleChart.prototype.sort = function(keyName, allValuesArray) {
    var key_type;
    key_type = this.get_type_from_key_name(keyName);
    switch (key_type) {
      case "Lookup_Kluster":
        return allValuesArray.sort((function(_this) {
          return function(a, b) {
            return Number(a) - Number(b);
          };
        })(this));
      default:
        return allValuesArray.sort();
    }
  };

  BubbleChart.prototype.remove_colors = function() {
//    this.circles.transition().duration(2000).style("fill", "#cfcfcf");
		this.circles.transition().duration(2000).style("fill", "#cfcfcf");
    return hide_color_chart();
  };

  BubbleChart.prototype.color_by = function(what_to_color_by) {
    var allValuesArray, color_mapper;
    this.what_to_color_by = what_to_color_by;
    allValuesArray = this.get_distinct_values(what_to_color_by);
    color_mapper = this.get_color_map(what_to_color_by, allValuesArray);
    show_color_chart(what_to_color_by, color_mapper);
    return this.circles.transition().duration(1000).style("fill", (function(_this) {
      return function(d) {
        return color_mapper[d.original[what_to_color_by]];
      };
    })(this));
  };

  BubbleChart.prototype.get_distinct_values = function(what) {
    var allValues, allValuesArray, key, value;
    allValues = {};
    this.nodes.forEach((function(_this) {
      return function(d) {
        var value;
        value = d.original[what];
        return allValues[value] = true;
      };
    })(this));
    allValuesArray = [];
    for (key in allValues) {
      value = allValues[key];
      allValuesArray.push(key);
    }
    this.sort(what, allValuesArray);
    return allValuesArray;
  };

    return BubbleChart;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  hankeUtil = (function() {
    function hankeUtil() {
      this.get_vis_year = __bind(this.get_vis_year, this);
    }

    hankeUtil.prototype.get_vis_year = function() {
      var $year_el, cur_year;
      $year_el = $('.viz_nav.year');
      return cur_year = $year_el.data('year');
    };

    return hankeUtil;

  })();

  root.hanke_utils = new hankeUtil;


  root = typeof exports !== "undefined" && exports !== null ? exports : this;
	
	root.options = {
  hvuosi: "all",
  };

  $(function() {
    var chart, filter_data, join_data, render_vis;
    chart = null;
    join_data = function(expend_recs, org_recs) {
      var expend_rec, full_records, i, j, org_rec;
      full_records = [];
      i = 0;
      j = 0;
      while (true) {
        expend_rec = expend_recs[i];
        org_rec = org_recs[j];
        if ((expend_rec == null) || (org_rec == null)) {
          break;
        }
        if (expend_rec.reg_no === org_rec.reg_no) {
          full_records.push($.extend({}, expend_rec, org_rec));
          i++;
        } else if (expend_rec.reg_no !== org_rec.reg_no) {
          j++;
        }
      }
      return full_records;
    };
		
		
    filter_data = function(records, year) {
      var filtered_csv, reduced, sorted;
      filtered_csv = records.filter(function(d) {
        if (parseInt(d.amount) < 0) {
          return false;
        } else if (year === 2014) {
          return d.vuosi === '2012-2014';
        } else if (year === 2013) {
          return d.vuosi === '2010-2012';
        } else if (year === 2012) {
          return d.vuosi === '2008-2010';
        } else if (year === 2011) {
          return d.vuosi === '2006-2008';
        } else if (year === 'arvo') {
          return d.vuosi === '2012-2014' && d.teema === 'arvo';
        } else if (year === 'arvo') {
          return d.vuosi === '2012-2014' && d.teema === 'arvo2';
        } else {
          return false;
        }
      });
      sorted = filtered_csv.sort(function(a, b) {
        return d3.descending(parseFloat(a.amount), parseFloat(b.amount));
      });
      reduced = _.reduce(filtered_csv, function(acc, d) {
        var curr;
        curr = acc[d.hanke_name];
        if (curr == null) {
          curr = [];
        }
        curr.push(d);
        curr = _.sortBy(curr, function(d) {
          return parseFloat(d.amount.slice(5));
        }).reverse();
        acc[d.hanke_name] = _.first(curr, 1);
        return acc;
      }, {});
      filtered_csv;
      return sorted;
    };
    root.update_year = function(next) {
      var $year_el, cur_year, direction, filtered_records, next_year, range, records;
      records = window.raw_records;
      cur_year = hanke_utils.get_vis_year();
//      direction = next ? 1 : -1;
			direction = next ? 1 : -1;
      next_year = cur_year + 1 * direction;
      if (next_year === 2011) {
        $('.time_nav.left').animate({
          color: '#bcbbb4'
        }).removeClass('clickable');
      } else {
        $('.time_nav.left').animate({
          color: '#454542'
        }).addClass('clickable');
      }
      if (next_year === 2014) {
        $('.time_nav.right').animate({
          color: '#bcbbb4'
        }).removeClass('clickable');
      } else {
        $('.time_nav.right').animate({
          color: '#454542'
        }).addClass('clickable');
      }
      range = d3.range(2011, 2014.1, 1);
      if (__indexOf.call(range, next_year) < 0) {
        return;
      }
      $year_el = $('.viz_nav.year');
      $year_el.animate({
        color: 'white'
      }, {
        complete: function() {
          $year_el.text(next_year);
          $year_el.data('year', next_year);
          return $year_el.animate({
            color: '#454542'
          });
        }
      });
      filtered_records = filter_data(records, next_year);
      window.debug_now = true;
      window.records = filtered_records;
      return chart.update_data(filtered_records);
    };
    render_vis = function(error, expenditure_records) {
//		  update_data();
//      render_colors(csv);
			var filtered_records, raw_records;
      raw_records = expenditure_records;
      window.raw_records = raw_records;
      filtered_records = filter_data(raw_records, 2014);
      window.records = filtered_records;
			render_colors(records);
//			update_data();
      chart = new BubbleChart(filtered_records);
      return chart.display_group_all();
    };
    root.get_chart = (function(_this) {
      return function() {
        return chart;
    };
    
		
    })(this);
		root.color_by = (function(_this) {
      return function(colorBy) {
        if (colorBy === '') {
          return chart.remove_colors();
        } else {
          return chart.color_by(colorBy);
        }
      };
		})(this);
		
//		root.filter_hvuosi = (function(_this) {
//      return function(colorBy) {
//        if (colorBy === '') {
//          return chart.remove_colors();
//        } else {
//          return chart.color_by(colorBy);
//        }
//      };
//		})(this);
		
    $('#viz_nav_container .viz_nav').on('click', function(e) {
      var $viz_nav, currentFunc, func;
      e.preventDefault();
      $viz_nav = $(e.target).closest('.viz_nav');
      func = $viz_nav.data('name');
      currentFunc = $('.viz_nav.btn.selected').data('name');
      $viz_nav.animate({
        backgroundColor: 'white'
      });
      $viz_nav.animate({
        backgroundColor: '#363331'
      });
      if (func !== currentFunc) {
        $viz_nav.siblings('.btn').removeClass('selected');
        $viz_nav.addClass('selected');
        return window.get_chart().show_viz_type(func);
      } else {
        $viz_nav.removeClass('selected');
        return window.get_chart().show_viz_type('year');
      }
    });
    $('.time_nav.right').on('click', function(e) {
      if ($(this).hasClass('clickable')) {
        return window.update_year(true);
      }
    });
    $('.time_nav.left').on('click', function(e) {
      if ($(this).hasClass('clickable')) {
        return window.update_year(false);
      }
    });
		
		$("#search").keyup(function() {
      var searchTerm;
      searchTerm = $(this).val();
      return chart.updateSearch(searchTerm);
    });
		
//		   var MySelect;
//   $(document).ready(function () {
//	          var searchtesti;
////						var Myselect;
//            MySelect = $('.testselect3').SumoSelect();
//						var searchtesti = (MySelect);
//						return chart.updateSearchx(searchtesti);				
//        });
		 
		 
//   $(document).ready(function () {
//	          var searchTermx;
//            searchTermx = $('select.testselect3')[0].sumo;
//						return chart.updateSearch(searchTermx);
//   });
//		
//		var MySelect;
//   $(document).ready(function () {
//            MySelect = $('.testselect3').SumoSelect();
//						}).get();			
//				    if (MySelect.length > 0 !== undefined) {
//            $("#str").html("some_search_script.php?cat="+searchTermx.join(", "));
//						  $("#str").html("some_search_script.php?cat="+MySelect);
//            }
		
		
//		var MySelect = $('select.testselect3')[0].sumo;
//		}).get();			
//				if (MySelect.length > 0 !== undefined) {
// //           $("#str").html("some_search_script.php?cat="+searchTermx.join(", "));
//						$("#str").html("some_search_script.php?cat="+searchTermx);
//        }
//		var searchtesti = MySelect;
//		return chart.updateSearchx(searchtesti);
		
//		$('#myForm input').on('change', function() {
//		  var searchTermx;
//			var searchTermy;
//			var searchTermz;
//      searchTermx = $('input[name=radioNamex]:checked', '#myForm').val();
//			searchTermy = $('input[name=radioNamey]:checked', '#myForm').val();
//			searchTermz = $('input[name=radioNamez]:checked', '#myForm').val();
//			return chart.updateSearchx(searchTermx, searchTermy, searchTermz);
//			return chart.updateSearchx(searchTermy);
//			return chart.updateSearchx(searchTermz);
//    });
		
//		$("#myForm input").click(function () {
//        var searchTermx;
//				var searchtesti;
//				var searchTermx = $('input[name=radioName]:checked').map(function (_, el) {
//						return $(el).val();						 
//        }).get();			
//				if (searchTermx.length > 0 !== undefined) {
// //           $("#str").html("some_search_script.php?cat="+searchTermx.join(", "));
//						$("#str").html("some_search_script.php?cat="+searchTermx);
//        }
//        var searchtesti = (searchTermx.join(","));
//				return chart.updateSearchx(searchtesti);
//    });
		
//    root.color_by = (function(_this) {
//      return function(colorBy) {
//        if (colorBy === '') {
//          return chart.remove_colors();
//        } else {
//          return chart.color_by(colorBy);
//        }
//      };
//		})(this);
    return queue().defer(d3.csv, "data/kirjastohankkeet4.csv").await(render_vis);
  });
	  return root.update_options = function(new_options) {
      root.options = $.extend({}, root.options, new_options);
      return chart.update();
    };

}).call(this);
