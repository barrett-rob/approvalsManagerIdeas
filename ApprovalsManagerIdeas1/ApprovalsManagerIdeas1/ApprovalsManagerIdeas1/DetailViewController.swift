//
//  DetailViewController.swift
//  ApprovalsManagerIdeas1
//
//  Created by Rob Barrett on 22/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import UIKit

class DetailViewController: UITableViewController {

    var data: AMData!
    var itemType: String?

    // MARK: - Table View

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1 // for now
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data.getRecords(itemType).count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("itemIdCell", forIndexPath: indexPath) as UITableViewCell
        let records = data.getRecords(itemType)
        if records.count > indexPath.row {
            let record = records[indexPath.row]
            cell.textLabel?.text = record.itemId
            cell.detailTextLabel?.text = record.itemDescription
            if let amountTextLabel = cell.viewWithTag(2) as? UILabel {
                if let v = record.value {
                    amountTextLabel.text = String(format: "$%.2f", arguments: [ v.doubleValue ])
                }
            }
        }
        return cell
    }
}

